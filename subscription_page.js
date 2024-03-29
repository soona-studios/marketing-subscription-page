//constants
const baseUrl = 'https://book.soona.co';

const subscriptionTiers = [
  'free', 'tier-one', 'tier-two', 'tier-three',
]

const timeFrames = [ 'month', 'year' ];

// variables
  let selectedTier = null,
  timeFrame = 1;

// functions
function navigationProcess(source = null) {
  window.location.href = createSubscriptionDialoguePath(source);
}

function createSubscriptionDialoguePath(source = null) {
  let url = `${baseUrl}/#/sign-up?`;
  if (source) url += `account_creation_source=${source}_pricing&`;
  if (selectedTier !== 0) {
    url += `open_subscription_checkout=${subscriptionTiers[selectedTier]}&recurring_interval=${timeFrames[timeFrame]}&redirect=/`;
  }
  return url;
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

document.addEventListener('DOMContentLoaded', function () {
  let yearlyButton = document.getElementById('yearly-toggle');
  let monthlyButton = document.getElementById('monthly-toggle');
  let yearlyFreeTierCardButton = document.getElementById('free-yearly-tier-card-button');
  let monthlyFreeTierCardButton = document.getElementById('free-monthly-tier-card-button');
  let freeTierCardButtons = [yearlyFreeTierCardButton, monthlyFreeTierCardButton];
  let freeTierTableButton = document.getElementById('free-tier-table-button');
  let yearlyBasicTierCardButton = document.getElementById('basic-yearly-tier-card-button');
  let monthlyBasicTierCardButton = document.getElementById('basic-monthly-tier-card-button');
  let basicTierCardButtons = [yearlyBasicTierCardButton, monthlyBasicTierCardButton];
  let basicTierTableButton = document.getElementById('basic-tier-table-button');
  let yearlyProTierCardButton = document.getElementById('pro-yearly-tier-card-button');
  let monthlyProTierCardButton = document.getElementById('pro-monthly-tier-card-button');
  let proTierCardButtons = [yearlyProTierCardButton, monthlyProTierCardButton];
  let proTierTableButton = document.getElementById('pro-tier-table-button');
  let yearlyBusinessTierCardButton = document.getElementById('business-yearly-tier-card-button');
  let monthlyBusinessTierCardButton = document.getElementById('business-monthly-tier-card-button');
  let businessTierCardButtons = [yearlyBusinessTierCardButton, monthlyBusinessTierCardButton];
  let businessTierTableButton = document.getElementById('business-tier-table-button');

  yearlyButton.addEventListener('click', () => {
    timeFrame = 1;
    linkClicked('subscription header', yearlyButton.innerHTML, null);
  });

  monthlyButton.addEventListener('click', () => {
    timeFrame = 0;
    linkClicked('subscription header', monthlyButton.innerHTML, null);
  });

  freeTierCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTier = 0;
      linkClicked('pricing card', button.innerHTML, createSubscriptionDialoguePath('start_for_free'));
      navigationProcess('start_for_free');
    });
  });

  freeTierTableButton.addEventListener('click', () => {
    selectedTier = 0;
    linkClicked('pricing table', freeTierTableButton.innerHTML, createSubscriptionDialoguePath('start_for_free'));
    navigationProcess('start_for_free');
  });

  basicTierCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTier = 1;
      linkClicked('pricing card', button.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_basic`));
      navigationProcess(`get_started_${timeFrames[timeFrame]}_basic`);
    });
  });

  basicTierTableButton.addEventListener('click', () => {
    selectedTier = 1;
    linkClicked('pricing table', basicTierTableButton.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_basic`));
    navigationProcess(`get_started_${timeFrames[timeFrame]}_basic`);
  });

  proTierCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTier = 2;
      linkClicked('pricing card', button.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_pro`));
      navigationProcess(`get_started_${timeFrames[timeFrame]}_pro`);
    });
  });

  proTierTableButton.addEventListener('click', () => {
    selectedTier = 2;
    linkClicked('pricing table', proTierTableButton.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_pro`));
    navigationProcess(`get_started_${timeFrames[timeFrame]}_pro`);
  });

  businessTierCardButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTier = 3;
      linkClicked('pricing card', button.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_business`));
      navigationProcess(`get_started_${timeFrames[timeFrame]}_business`);
    });
  });

  businessTierTableButton.addEventListener('click', () => {
    selectedTier = 3;
    linkClicked('pricing table', businessTierTableButton.innerHTML, createSubscriptionDialoguePath(`get_started_${timeFrames[timeFrame]}_business`));
    navigationProcess(`get_started_${timeFrames[timeFrame]}_business`);
  });
});
