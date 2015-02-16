var url = 'http://localhost:9001/test/fixtures/';

function getScrollerElement(id) {
  return element(by.css('[href="#' + id + '"]'));
}

function getHeaderText() {
  return element(by.id('header-message')).getText();
}

describe('iscroll-click-directive', function() {
  beforeEach(function() {
    browser.get(url);
  });

  it('should not inadvertently click after finishing dragging', function() {
    getScrollerElement('05').click();

    expect(getHeaderText()).toEqual('hello 05!');
  });

  it('should perform the action in the expression', function() {
    var driver = browser.driver;

    driver.actions()
      .mouseDown(getScrollerElement('12'))
      .mouseMove(getScrollerElement('08'))
      .mouseUp().perform();

    expect(browser.getLocationAbsUrl()).toBe('');
  });
});
