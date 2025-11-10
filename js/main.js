const state = {
  trafficRange: 'weekly',
  charts: {
    traffic: null,
    daily: null,
    mobile: null,
  },
  notifications: [],
  messages: [],
  members: [],
  dashboard: null,
};

const selectors = {
  alertBanner: document.getElementById('alert'),
  trafficNavLinks: document.querySelectorAll('.traffic-nav-link'),
  notifications: document.getElementById('notifications'),
  clearNotifications: document.getElementById('clearNotifications'),
  membersList: document.getElementById('membersList'),
  activityList: document.getElementById('activityList'),
  socialList: document.getElementById('socialList'),
  messageForm: document.getElementById('messageForm'),
  userField: document.getElementById('userField'),
  userSuggestions: document.getElementById('userSuggestions'),
  messageField: document.getElementById('messageField'),
  messageResponse: document.getElementById('messageResponse'),
  messageHistoryList: document.getElementById('messageHistoryList'),
  trafficCanvas: document.getElementById('traffic-chart'),
  dailyCanvas: document.getElementById('daily-chart'),
  mobileCanvas: document.getElementById('doughnut-chart'),
  navbar: document.querySelector('.navigation'),
};

const palette = ['#D5D6EC', '#7477BF', '#4D4C72', '#81C98F', '#51B6C8'];

const getPalette = (count) => {
  return Array.from({ length: count }, (_, index) => palette[index % palette.length]);
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.error || response.statusText;
    throw new Error(message);
  }

  return payload;
};

const setMessage = (text, type = 'success') => {
  const { messageResponse } = selectors;
  if (!messageResponse) return;

  messageResponse.textContent = text;
  messageResponse.classList.remove('success', 'error');
  if (!text) {
    return;
  }
  messageResponse.classList.add(type);
};

const renderAlert = (notification) => {
  const { alertBanner } = selectors;
  if (!alertBanner) return;

  alertBanner.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'alert-banner';
  const messageParagraph = document.createElement('p');

  if (notification) {
    const strong = document.createElement('strong');
    strong.textContent = 'Alert:';
    messageParagraph.append(strong, document.createTextNode(` ${notification.message}`));
  } else {
    const strong = document.createElement('strong');
    strong.textContent = 'Great!';
    messageParagraph.append(strong, document.createTextNode(" You're all caught up."));
  }

  const closeButton = document.createElement('button');
  closeButton.className = 'alert-banner-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Dismiss alert');
  closeButton.textContent = '×';

  closeButton.addEventListener('click', () => {
    alertBanner.innerHTML = '';
  });

  container.append(messageParagraph, closeButton);
  alertBanner.appendChild(container);
};

const renderNotifications = (notifications = []) => {
  const { notifications: container, clearNotifications } = selectors;
  if (!container) return;

  state.notifications = notifications;
  if (state.dashboard) {
    state.dashboard.notifications = notifications;
  }
  container.innerHTML = '';

  notifications.forEach((notification) => {
    const card = document.createElement('div');
    card.className = 'notification-card';

    const message = document.createElement('p');
    message.className = 'notification-message';
    message.textContent = notification.message;

    const dismiss = document.createElement('button');
    dismiss.className = 'notification-dismiss';
    dismiss.type = 'button';
    dismiss.dataset.id = notification.id;
    dismiss.textContent = 'Dismiss';

    const time = document.createElement('p');
    time.className = 'notification-time';
    time.textContent = notification.relativeTime;

    card.append(message, dismiss, time);
    container.appendChild(card);
  });

  if (clearNotifications) {
    clearNotifications.disabled = notifications.length === 0;
  }

  renderAlert(notifications[0]);
};

const renderSocial = (social = []) => {
  const { socialList } = selectors;
  if (!socialList) return;
  socialList.innerHTML = '';

  social.forEach((platform) => {
    const container = document.createElement('div');
    container.className = 'social-container';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'social-image';
    const slug = platform.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const iconPath = `svgs/${slug}.svg`;
    const icon = document.createElement('img');
    icon.src = iconPath;
    icon.alt = `${platform.name} icon`;
    imageWrapper.appendChild(icon);

    const textWrapper = document.createElement('div');
    textWrapper.className = 'social-text';
    const name = document.createElement('p');
    name.className = 'social-name';
    name.textContent = platform.name;
    const followers = document.createElement('p');
    followers.className = 'social-number';
    followers.textContent = platform.followers.toLocaleString();

    textWrapper.append(name, followers);
    container.append(imageWrapper, textWrapper);
    socialList.appendChild(container);
  });
};

const renderMembers = (members = []) => {
  const { membersList } = selectors;
  if (!membersList) return;
  membersList.innerHTML = '';

  members.forEach((member) => {
    const container = document.createElement('div');
    container.className = 'members-container';

    const image = document.createElement('img');
    image.src = member.avatar;
    image.alt = `${member.name} profile picture`;
    image.className = 'profile-image';

    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const memberText = document.createElement('div');
    memberText.className = 'members-text';

    const name = document.createElement('p');
    name.textContent = member.name;

    const email = document.createElement('a');
    email.href = `mailto:${member.email}`;
    email.textContent = member.email;

    memberText.append(name, email);

    const joined = document.createElement('p');
    joined.textContent = new Date(member.joined).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    textContainer.append(memberText, joined);
    container.append(image, textContainer);
    membersList.appendChild(container);
  });
};

const renderActivity = (activity = []) => {
  const { activityList } = selectors;
  if (!activityList) return;
  activityList.innerHTML = '';

  activity.forEach((item) => {
    const container = document.createElement('div');
    container.className = 'members-container';

    const image = document.createElement('img');
    image.src = item.avatar;
    image.alt = `${item.name} profile picture`;
    image.className = 'profile-image';

    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const activityText = document.createElement('div');
    activityText.className = 'members-text';
    activityText.innerHTML = `<p>${item.name} ${item.action}</p>`;

    const time = document.createElement('p');
    time.textContent = item.time;

    textContainer.append(activityText, time);
    container.append(image, textContainer);
    activityList.appendChild(container);
  });
};

const renderMessageSuggestions = (members = []) => {
  const { userSuggestions } = selectors;
  if (!userSuggestions) return;
  userSuggestions.innerHTML = '';

  members.forEach((member) => {
    const option = document.createElement('option');
    option.value = member.name;
    option.label = member.email;
    userSuggestions.appendChild(option);
  });
};

const renderMessageHistory = (messages = []) => {
  const { messageHistoryList } = selectors;
  if (!messageHistoryList) return;
  messageHistoryList.innerHTML = '';

  if (!messages.length) {
    const empty = document.createElement('li');
    empty.className = 'message-history-item';
    empty.textContent = 'No messages yet. Start the conversation!';
    messageHistoryList.appendChild(empty);
    return;
  }

  messages
    .slice()
    .reverse()
    .forEach((entry) => {
      const item = document.createElement('li');
      item.className = 'message-history-item';
      const user = document.createElement('strong');
      user.textContent = entry.user;

      const message = document.createElement('p');
      message.textContent = entry.message;

      const timestamp = document.createElement('span');
      timestamp.textContent = new Date(entry.sentAt).toLocaleString();

      item.append(user, message, timestamp);
      messageHistoryList.appendChild(item);
    });
};

const renderTrafficChart = (range = state.trafficRange) => {
  const { trafficCanvas } = selectors;
  if (!trafficCanvas || !state.dashboard) return;

  const dataset = state.dashboard.traffic[range];
  if (!dataset) return;

  state.trafficRange = range;
  updateTrafficNavState(range);

  const data = {
    labels: dataset.labels,
    datasets: [
      {
        data: dataset.data,
        backgroundColor: '#4D4C72',
        borderWidth: 4,
        tension: 0.4,
        fill: false,
        borderColor: '#4D4C72',
        pointBackgroundColor: '#fff',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    animation: { duration: 600 },
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  if (!state.charts.traffic) {
    state.charts.traffic = new Chart(trafficCanvas.getContext('2d'), {
      type: 'line',
      data,
      options,
    });
  } else {
    state.charts.traffic.data.labels = data.labels;
    state.charts.traffic.data.datasets[0].data = dataset.data;
    state.charts.traffic.update();
  }
};

const renderDailyChart = () => {
  const { dailyCanvas } = selectors;
  if (!dailyCanvas || !state.dashboard) return;

  const dataset = state.dashboard.dailyTraffic;
  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: 'Daily Hits',
        data: dataset.data,
        backgroundColor: '#7477BF',
        borderColor: '#4D4C72',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  if (!state.charts.daily) {
    state.charts.daily = new Chart(dailyCanvas.getContext('2d'), {
      type: 'bar',
      data,
      options,
    });
  } else {
    state.charts.daily.data.labels = data.labels;
    state.charts.daily.data.datasets[0].data = dataset.data;
    state.charts.daily.update();
  }
};

const renderMobileChart = () => {
  const { mobileCanvas } = selectors;
  if (!mobileCanvas || !state.dashboard) return;

  const dataset = state.dashboard.mobileUsers;
  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: 'Mobile Users',
        data: dataset.data,
        backgroundColor: getPalette(dataset.data.length),
        borderColor: '#4D4C72',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  if (!state.charts.mobile) {
    state.charts.mobile = new Chart(mobileCanvas.getContext('2d'), {
      type: 'doughnut',
      data,
      options,
    });
  } else {
    state.charts.mobile.data.labels = data.labels;
    state.charts.mobile.data.datasets[0].data = dataset.data;
    state.charts.mobile.data.datasets[0].backgroundColor = getPalette(dataset.data.length);
    state.charts.mobile.update();
  }
};

const renderDashboard = (dashboard) => {
  state.dashboard = dashboard;
  state.members = dashboard.members;
  state.messages = dashboard.messages;
  renderTrafficChart(state.trafficRange);
  renderDailyChart();
  renderMobileChart();
  renderSocial(dashboard.social);
  renderMembers(dashboard.members);
  renderActivity(dashboard.activity);
  renderNotifications(dashboard.notifications);
  renderMessageHistory(dashboard.messages);
  renderMessageSuggestions(dashboard.members);
};

const updateTrafficNavState = (range) => {
  selectors.trafficNavLinks.forEach((link) => {
    const isActive = link.dataset.range === range;
    link.classList.toggle('active', isActive);
  });
};

const handleTrafficNavClick = (event) => {
  const target = event.target.closest('.traffic-nav-link');
  if (!target) return;

  const { range } = target.dataset;
  if (!range || range === state.trafficRange) return;

  updateTrafficNavState(range);
  renderTrafficChart(range);
};

const refreshNotifications = async () => {
  try {
    const notifications = await fetchJson('/api/notifications');
    renderNotifications(notifications);
  } catch (error) {
    console.error('Unable to load notifications', error);
    setMessage('Unable to refresh notifications.', 'error');
  }
};

const refreshMessages = async () => {
  try {
    const messages = await fetchJson('/api/messages');
    state.messages = messages;
    if (state.dashboard) {
      state.dashboard.messages = messages;
    }
    renderMessageHistory(messages);
  } catch (error) {
    console.error('Unable to load messages', error);
  }
};

const handleNotificationClick = async (event) => {
  const button = event.target.closest('.notification-dismiss');
  if (!button) return;
  const { id } = button.dataset;
  if (!id) return;

  try {
    await fetchJson(`/api/notifications/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    await refreshNotifications();
  } catch (error) {
    console.error('Unable to dismiss notification', error);
    setMessage('Unable to dismiss notification.', 'error');
  }
};

const handleClearNotifications = async () => {
  try {
    await fetchJson('/api/notifications', { method: 'DELETE' });
    await refreshNotifications();
  } catch (error) {
    console.error('Unable to clear notifications', error);
    setMessage('Unable to clear notifications.', 'error');
  }
};

const handleMessageSubmit = async (event) => {
  event.preventDefault();
  const { userField, messageField } = selectors;
  if (!userField || !messageField) return;

  const user = userField.value.trim();
  const message = messageField.value.trim();

  if (!user || !message) {
    setMessage('Please provide both a user and a message.', 'error');
    return;
  }

  setMessage('Sending message...');

  try {
    await fetchJson('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ user, message }),
    });

    userField.value = '';
    messageField.value = '';
    setMessage('Message delivered successfully!', 'success');
    await refreshMessages();
  } catch (error) {
    console.error('Unable to send message', error);
    setMessage(error.message, 'error');
  }
};

const loadDashboard = async () => {
  try {
    const dashboard = await fetchJson('/api/dashboard');
    renderDashboard(dashboard);
  } catch (error) {
    console.error('Unable to load dashboard data', error);
    setMessage('Unable to load dashboard data.', 'error');
  }
};

const setupEventListeners = () => {
  selectors.trafficNavLinks.forEach((link) =>
    link.addEventListener('click', handleTrafficNavClick)
  );

  if (selectors.notifications) {
    selectors.notifications.addEventListener('click', handleNotificationClick);
  }

  if (selectors.clearNotifications) {
    selectors.clearNotifications.addEventListener('click', handleClearNotifications);
  }

  if (selectors.messageForm) {
    selectors.messageForm.addEventListener('submit', handleMessageSubmit);
  }
};

const setupStickyNav = () => {
  const { navbar } = selectors;
  if (!navbar) return;

  const sticky = navbar.offsetTop;
  const handleScroll = () => {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', handleScroll);
};

const init = async () => {
  setupEventListeners();
  setupStickyNav();
  await loadDashboard();
};

init();
