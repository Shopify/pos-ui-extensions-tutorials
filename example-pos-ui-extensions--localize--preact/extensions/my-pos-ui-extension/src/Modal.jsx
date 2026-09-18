import {render} from 'preact';
// Allows the use of `shopify.cart.current.value` as a stateful subscription.
import '@shopify/ui-extensions/preact';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const {i18n} = shopify;
  // [START localization.format-percentage]
  const percentageDiscount = 25.5;
  const formattedPercentageDiscount = i18n.formatNumber(percentageDiscount);
  // [END localization.format-percentage]
  // [START localization.format-currency]
  const fixedDiscountAmount = 10;
  const formattedFixedDiscountAmount = i18n.formatCurrency(fixedDiscountAmount, {currency: 'CAD'});
  // [END localization.format-currency]
  // [START localization.translate-item-count]
  const itemCount = shopify.cart.current.value.lineItems.length;
  // [END localization.translate-item-count]
  const onButtonClick = async (type, title, amount) => {
    try {
      await shopify.cart.applyCartDiscount(type, title, amount);
      // Resolution doesn't prove application, and a matching discount title
      // might already exist. Ask the merchant to check the cart.
      // [START localization.translate-discount-message]
      shopify.toast.show(i18n.translate('discountUnconfirmed'));
      // [END localization.translate-discount-message]
    } catch {
      shopify.toast.show(i18n.translate('discountUnconfirmed'));
    }
  };

  return (
    // [START localization.build-modal-ui]
    <s-page heading={i18n.translate('modalTitle')}>
      <s-scroll-box>
      <s-stack gap="base">
        <s-text>
          {i18n.translate('itemCount', {count: itemCount})}
        </s-text>
        <s-button onClick={() => onButtonClick('Percentage', '25.5% off', '25.5')}>
          {formattedPercentageDiscount}%
        </s-button>
        <s-button onClick={() => onButtonClick('FixedAmount', '$10 off', '10')}>
          {formattedFixedDiscountAmount}
        </s-button>
        </s-stack>
      </s-scroll-box>
    </s-page>
  );
}
// [END localization.build-modal-ui]