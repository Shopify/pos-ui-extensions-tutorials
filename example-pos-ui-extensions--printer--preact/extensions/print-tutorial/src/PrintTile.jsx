import {render} from 'preact';

export default async () => {
  render(<Extension />, document.body);
}

function Extension() {
  return (
    <s-tile
      heading="Print Tutorial"
      onClick={() => shopify.action.presentModal()}
    />
  );
}
