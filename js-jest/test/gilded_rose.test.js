const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should create item", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should degrade twice as fast when sellIn reaches 0", function() {
    const initialQuality = 20;
    const items = [
      new Item("normal", 10, initialQuality),
      new Item("twice", 0, initialQuality)
    ]
    const gildedRose = new Shop(items);
    const degradedItems = gildedRose.updateQuality();
    const degrade0 = initialQuality - degradedItems[0].quality;
    const degrade1 = initialQuality - degradedItems[1].quality;
    expect(degrade1).toBe(degrade0 * 2);
  });

  it("should never have a negative quality", function() {
    const gildedRose = new Shop([new Item("negative", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("should increment the quality 1 unit when sellIn is greater than 0 for Aged Brie", function() {
    const initialQuality = 20;
    const gildedRose = new Shop([new Item("Aged Brie", 10, initialQuality)]);
    const items = gildedRose.updateQuality();
    const increment = items[0].quality - initialQuality;
    expect(increment).toBe(1);
  });

  it("should increment the quality 2 units when sellIn reaches 0 for Aged Brie", function() {
    const initialQuality = 20;
    const gildedRose = new Shop([new Item("Aged Brie", 0, initialQuality)]);
    const items = gildedRose.updateQuality();
    const increment = items[0].quality - initialQuality;
    expect(increment).toBe(2);
  });

  it("should never increment over 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should never change sellIn and quality for Sulfuras, Hand of Ragnaros", function() {
    const initialSellIn = 20;
    const initialQuality = 80;
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", initialSellIn, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(initialSellIn);
    expect(items[0].quality).toBe(initialQuality);
  });

  it("should increment the quality 2 units when sellIn is 10 or less for Backstage passes to a TAFKAL80ETC concert", function() {
    const initialQuality = 20;
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, initialQuality)]);
    const items = gildedRose.updateQuality();
    const increment = items[0].quality - initialQuality;
    expect(increment).toBe(2);
  });

  it("should increment the quality 3 units when sellIn is 5 or less for Backstage passes to a TAFKAL80ETC concert", function() {
    const initialQuality = 20;
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, initialQuality)]);
    const items = gildedRose.updateQuality();
    const increment = items[0].quality - initialQuality;
    expect(increment).toBe(3);
  });

  it("should have quality as 0 when sellIn is 0 for Backstage passes to a TAFKAL80ETC concert", function() {
    const initialQuality = 20;
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should degrade twice as fast for Conjured when sellIn is greater than 0", function() {
    const initialQuality = 20;
    const items = [
      new Item("normal", 10, initialQuality),
      new Item("Conjured", 10, initialQuality)
    ]
    const gildedRose = new Shop(items);
    const degradedItems = gildedRose.updateQuality();
    const degrade0 = initialQuality - degradedItems[0].quality;
    const degrade1 = initialQuality - degradedItems[1].quality;
    expect(degrade1).toBe(degrade0 * 2);
  });

  it("should degrade twice as fast for Conjured when sellIn is 0", function() {
    const initialQuality = 20;
    const items = [
      new Item("normal", 0, initialQuality),
      new Item("Conjured", 0, initialQuality)
    ]
    const gildedRose = new Shop(items);
    const degradedItems = gildedRose.updateQuality();
    const degrade0 = initialQuality - degradedItems[0].quality;
    const degrade1 = initialQuality - degradedItems[1].quality;
    expect(degrade1).toBe(degrade0 * 2);
  });
});
