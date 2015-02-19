var url = 'http://localhost:9001/test/fixtures/',
    driver = browser.driver;

function dragList(driver, from) {
  driver.actions()
    .dragAndDrop(element(by.hashInScrollList(from)), {x: -20, y: 0})
    .perform();
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
    dragList(driver, '09');
    expect(browser.getLocationAbsUrl()).toBe('');
  });

  it('should inadvertently click after finishing dragging with a regular ng-click', function() {
    dragList(driver, '10');
    expect(browser.getLocationAbsUrl()).toBe('/10');
  });
});
