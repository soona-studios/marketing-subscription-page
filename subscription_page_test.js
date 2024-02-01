//constants
const baseUrl = 'https://release.soona.co';

// reactive objects
const accountId = {
  value: null,
  set(value) {
    this.value = value;
    this.valueListener(value);
  },
  get() {
    return this.value;
  },
  valueListener(value) {},
  addValueListener: function (listener) {
    this.valueListener = listener;
  },
};

accountId.addValueListener(value => {
  if (!value) return;
  else {
    navigationProcess();
  }
});


// variables
let authToken = null,
  selectedTier = null,
  timeFrame = 0;

// functions
async function navigationProcess() {
  if(!authToken || authToken === 'null' || authToken === 'undefined') return;
  window.location.href = createMediaEditorPath();
}

function createSubscriptionDialoguePath() {
  return `${baseUrl}/#/`;
}

function getContextFromUrl() {
  let url = window.location.href;
  let splitUrl = url.split('/');
  let context = splitUrl[splitUrl.length - 1];
  context = context.replace(/[\-_]/g, ' ');
  return context;
}

function linkClicked(subContext, linkLabel, linkHref) {
  try {
    analytics.track('Link Clicked',
    {
      context: getContextFromUrl(),
      subContext: subContext,
      linkLabel: linkLabel,
      linkHref: linkHref,
    });
  } catch (error) {
    console.error(error);
  }
}

// auth portal

function receiveMessage(event) {
  if (event.origin !== baseUrl) return;
  let splitData = event.data.split(',');
  authToken = splitData[1].split(':')[1];
  if (!authToken || authToken === 'null' || authToken === 'undefined') return;
  accountId.set(splitData[0].split(':')[1]);
}

function openAuthPortal() {
  let popupWinWidth = 500;
  let popupWinHeight = 600;
  let left = window.screenX + (window.outerWidth - popupWinWidth) / 2;
  let top = window.screenY + (window.outerHeight - popupWinHeight) / 2;
  let popUpUrl = `${baseUrl}/#/sign-up?isExternalAuthPortal=true&redirect=/sign-in%3FisExternalAuthPortal=true`;
  let newWindow = window.open(popUpUrl,'google window','width='+popupWinWidth+',height='+popupWinHeight+',top='+top+',left='+left);
  newWindow.focus()
  // add event listener to receive message from auth portal
  window.addEventListener('message', receiveMessage, false);
}

const addHighlight = el => () => el.classList.add('highlight');
const removeHighlight = el => () => el.classList.remove('highlight');
const addHideClass = el => el.classList.add('hide');
const removeHideClass = el => el.classList.remove('hide');

document.addEventListener('DOMContentLoaded', function () {
  let yearlyButton = document.getElementById('yearly-toggle');
  let monthlyButton = document.getElementById('monthly-toggle');
  let freeTierCardButton = document.getElementById('free-tier-card-button');
  let freeTierTableButton = document.getElementById('free-tier-table-button');
  let basicTierCardButton = document.getElementById('basic-tier-card-button');
  let basicTierTableButton = document.getElementById('basic-tier-table-button');
  let proTierCardButton = document.getElementById('pro-tier-card-button');
  let proTierTableButton = document.getElementById('pro-tier-table-button');
  let businessTierCardButton = document.getElementById('enterprise-tier-card-button');
  let businessTierTableButton = document.getElementById('enterprise-tier-table-button');

  yearlyButton.addEventListener('click', () => {
    linkClicked('subscription header', yearlyButton.innerHTML, null);
    timeFrame = 0;
  });

  monthlyButton.addEventListener('click', () => {
    linkClicked('subscription header', monthlyButton.innerHTML, null);
    timeFrame = 1;
  });

  freeTierCardButton.addEventListener('click', () => {
    linkClicked('pricing card', freeTierCardButton.innerHTML, null);
    selectedTier = 0;
    openAuthPortal();
  });

  freeTierTableButton.addEventListener('click', () => {
    linkClicked('pricing table', freeTierTableButton.innerHTML, null);
    selectedTier = 0;
    openAuthPortal();
  });

  basicTierCardButton.addEventListener('click', () => {
    linkClicked('pricing card', basicTierCardButton.innerHTML, null);
    selectedTier = 1;
    openAuthPortal();
  });

  basicTierTableButton.addEventListener('click', () => {
    linkClicked('pricing table', basicTierTableButton.innerHTML, null);
    selectedTier = 1;
    openAuthPortal();
  });

  proTierCardButton.addEventListener('click', () => {
    linkClicked('pricing card', proTierCardButton.innerHTML, null);
    selectedTier = 2;
    openAuthPortal();
  });

  proTierTableButton.addEventListener('click', () => {
    linkClicked('pricing table', proTierTableButton.innerHTML, null);
    selectedTier = 2;
    openAuthPortal();
  });

  businessTierCardButton.addEventListener('click', () => {
    linkClicked('pricing card', businessTierCardButton.innerHTML, null);
    selectedTier = 3;
    openAuthPortal();
  });

  businessTierTableButton.addEventListener('click', () => {
    linkClicked('pricing table', businessTierTableButton.innerHTML, null);
    selectedTier = 3;
    openAuthPortal();
  });
});
