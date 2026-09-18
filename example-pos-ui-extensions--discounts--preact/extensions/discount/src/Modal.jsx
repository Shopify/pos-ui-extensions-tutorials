import { render } from "preact";

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  // [START modal.define-onpress]
  const onButtonClick = async (type, title, amount) => {
    try {
      await shopify.cart.applyCartDiscount(type, title, amount);
    } catch (error) {
      shopify.toast.show("Couldn't confirm the discount. Check the cart.");
      return;
    }
    // Resolution doesn't prove application, and a matching discount title might
    // already exist. Ask the merchant to confirm the result in the cart.
    shopify.toast.show("Check the cart to confirm the discount");
  };
  // [END modal.define-onpress]
  return (
    <s-page heading="Available Discounts">
      <s-scroll-box padding="base">
        <s-button onClick={() => onButtonClick("Percentage", "25% off", "25")}>
          25%
        </s-button>
        <s-button onClick={() => onButtonClick("FixedAmount", "$10 off", "10")}>
          $10
        </s-button>
      </s-scroll-box>
    </s-page>
  );
}
