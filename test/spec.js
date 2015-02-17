var url = 'http://localhost:9001/test/fixtures/',
    driver = browser.driver;

function dragList(driver, from, to) {
  driver.actions()
    .mouseDown(element(by.hashInScrollList(from)))
    .mouseMove(element(by.hashInScrollList(to)))
    .mouseUp().perform();
}

by.addLocator('hashInScrollList', function(hash) {
  var element = document.querySelector('[href="#' + hash + '"]');

  return [element];
});

describe('iscroll-click-directive', function() {
  beforeEach(function() {
    browser.get(url);
  });

  it('should perform the action in the expression', function() {
    element(by.hashInScrollList('05')).click();
    expect(element(by.id('header-message')).getText()).toEqual('hello 05!');
  });

  it('should not inadvertently click after finishing dragging', function() {
    dragList(driver, '11', '10');
    expect(browser.getLocationAbsUrl()).toBe('');
  });
});
