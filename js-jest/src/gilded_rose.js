class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const baseDec = 1;
    const baseInc = 1;
    return this.items.map(item => {
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        if (item.quality > 0 && item.quality < 50) {
          switch(item.name) {
            case 'Aged Brie':
              item.quality = item.sellIn > 0 ? item.quality + baseInc : item.quality + (baseInc * 2);
              break;
            case 'Backstage passes to a TAFKAL80ETC concert':
              if (item.sellIn === 0) {
                item.quality = 0;
              } else if (item.sellIn <= 5) {
                item.quality+=3;
              } else if (item.sellIn <= 10) {
                item.quality+=2;
              } else {
                item.quality++;
              }
              break;
            case 'Conjured':
              item.quality = item.sellIn > 0 ? item.quality - (baseDec * 2) : item.quality - (baseDec * 2 * 2);
              break;
            default:
              item.quality = item.sellIn > 0 ? item.quality - baseDec : item.quality - (baseDec * 2);
              break;
          }
        }
        item.sellIn--;
      }
      return item;
    });
  }
}

module.exports = {
  Item,
  Shop
}
