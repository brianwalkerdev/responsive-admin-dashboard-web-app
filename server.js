const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

const dashboardData = {
  traffic: {
    hourly: {
      labels: [
        '12am',
        '1am',
        '2am',
        '3am',
        '4am',
        '5am',
        '6am',
        '7am',
        '8am',
        '9am',
        '10am',
        '11am',
      ],
      data: [120, 90, 60, 75, 110, 160, 220, 340, 410, 480, 520, 550],
    },
    daily: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      data: [640, 820, 790, 860, 910, 840, 780],
    },
    weekly: {
      labels: [
        '16-22',
        '23-29',
        '30-5',
        '6-12',
        '13-19',
        '20-26',
        '27-3',
        '4-10',
        '11-17',
        '18-24',
        '25-31',
      ],
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    },
    monthly: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      data: [8200, 7600, 8400, 9100, 10300, 9800, 10500, 11200, 10800, 10100, 9600, 11500],
    },
  },
  dailyTraffic: {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    data: [65, 59, 80, 81, 56, 55, 40],
  },
  mobileUsers: {
    labels: ['Phones', 'Tablets', 'Desktop'],
    data: [2000, 550, 500],
  },
  social: [
    { name: 'Facebook', followers: 10320 },
    { name: 'Instagram', followers: 16445 },
    { name: 'Twitter', followers: 22189 },
  ],
  members: [
    {
      name: 'Victoria Chambers',
      email: 'victoria.chambers80@example.com',
      joined: '2024-10-15',
      avatar: 'images/member-1.jpg',
    },
    {
      name: 'Dale Byrd',
      email: 'dale.byrd52@example.com',
      joined: '2024-11-02',
      avatar: 'images/member-2.jpg',
    },
    {
      name: 'Dawn Wood',
      email: 'dawn.wood16@example.com',
      joined: '2024-11-06',
      avatar: 'images/member-3.jpg',
    },
    {
      name: 'Dan Oliver',
      email: 'dan.oliver82@example.com',
      joined: '2024-11-08',
      avatar: 'images/member-4.jpg',
    },
  ],
  activity: [
    {
      name: 'Victoria Chambers',
      action: "commented on <b>WebApp's SEO Tips</b>",
      time: '4 hours ago',
      avatar: 'images/member-1.jpg',
    },
    {
      name: 'Dale Byrd',
      action: "liked the post <b>Facebook's Changes for 2024</b>",
      time: '5 hours ago',
      avatar: 'images/member-2.jpg',
    },
    {
      name: 'Dawn Wood',
      action: "commented on <b>Facebook's Changes for 2024</b>",
      time: '5 hours ago',
      avatar: 'images/member-3.jpg',
    },
    {
      name: 'Dan Oliver',
      action: "posted <b>WebApp's SEO Tips</b>",
      time: '1 day ago',
      avatar: 'images/member-4.jpg',
    },
  ],
};

let notifications = [
  {
    id: 'deployment',
    message: 'New analytics build deployed successfully.',
    createdAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'billing',
    message: 'Billing integration responded with 99.99% uptime.',
    createdAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: 'marketing',
    message: 'Campaign CTR increased by 12% week-over-week.',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
];

const messageHistory = [];

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
};

const parseBody = async (req) => {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    req
      .on('data', (chunk) => {
        chunks.push(chunk);
        if (Buffer.concat(chunks).length > 1e6) {
          req.connection.destroy();
          reject(new Error('Payload too large'));
        }
      })
      .on('end', () => {
        if (!chunks.length) {
          resolve({});
          return;
        }

        try {
          const body = JSON.parse(Buffer.concat(chunks).toString());
          resolve(body);
        } catch (error) {
          reject(new Error('Invalid JSON body'));
        }
      })
      .on('error', reject);
  });
};

const formatRelativeTime = (timestamp) => {
  const diff = Date.now() - timestamp;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) {
    return 'just now';
  }
  if (diff < hour) {
    const value = Math.round(diff / minute);
    return `${value} minute${value === 1 ? '' : 's'} ago`;
  }
  if (diff < day) {
    const value = Math.round(diff / hour);
    return `${value} hour${value === 1 ? '' : 's'} ago`;
  }
  const value = Math.round(diff / day);
  return `${value} day${value === 1 ? '' : 's'} ago`;
};

const serveFile = (res, filePath) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - File not found');
        return;
      }

      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal server error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = parsedUrl;

  if (pathname.startsWith('/api/')) {
    if (req.method === 'GET' && pathname === '/api/dashboard') {
      const response = {
        ...dashboardData,
        notifications: notifications.map((notification) => ({
          ...notification,
          relativeTime: formatRelativeTime(notification.createdAt),
        })),
        messages: messageHistory.slice(-10),
      };
      sendJson(res, 200, response);
      return;
    }

    if (req.method === 'GET' && pathname === '/api/notifications') {
      sendJson(
        res,
        200,
        notifications.map((notification) => ({
          ...notification,
          relativeTime: formatRelativeTime(notification.createdAt),
        }))
      );
      return;
    }

    if (req.method === 'DELETE' && pathname === '/api/notifications') {
      const removed = notifications.length;
      notifications = [];
      sendJson(res, 200, { success: true, removed });
      return;
    }

    if (req.method === 'DELETE' && pathname.startsWith('/api/notifications/')) {
      const id = pathname.split('/').pop();
      const initialLength = notifications.length;
      notifications = notifications.filter((notification) => notification.id !== id);

      if (notifications.length === initialLength) {
        sendJson(res, 404, { error: 'Notification not found' });
        return;
      }

      sendJson(res, 200, { success: true });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/messages') {
      try {
        const body = await parseBody(req);
        const { user, message } = body;

        if (!user || !message) {
          sendJson(res, 400, { error: 'Both "user" and "message" are required.' });
          return;
        }

        const entry = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          user,
          message,
          sentAt: new Date().toISOString(),
        };
        messageHistory.push(entry);
        sendJson(res, 201, entry);
      } catch (error) {
        sendJson(res, 400, { error: error.message });
      }
      return;
    }

    if (req.method === 'GET' && pathname === '/api/messages') {
      sendJson(res, 200, messageHistory.slice(-20));
      return;
    }

    sendJson(res, 404, { error: 'Endpoint not found' });
    return;
  }

  const safePath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access denied');
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
