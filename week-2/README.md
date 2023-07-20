#  Introduction to JS and TS

Javascript Nedir?

JavaScript, geliştiricilerin etkileşimli web sayfaları oluşturmak için kullandığı bir programlama dilidir. JavaScript işlevleri, sosyal medya akışlarını yenilemekten animasyonlar ve etkileşimli haritalar göstermeye kadar, bir web sitesi kullanıcısının deneyimini iyileştirebilir. İstemci tarafındaki bir betik dili olarak, World Wide Web'in temel teknolojilerinden biridir. Örneğin, internette gezinirken bir görsel döngüsü, görmek için tıkla açılır menüsü ya da bir web sayfasında dinamik olarak değişen öğe renkleri gördüğünüzde JavaScript efektlerini görmüş olursunuz.


Javascript OOP Yapısı

Javascript’te classes (sınıflar) kavramı bulunmamaktadır ve Javascript classes kavramı yerine fonksiyonları kullanmaktadır

Prototype (prototip) özelliği Javascript’te Inheritance’ın (kalıtımın) temelini oluşturmaktadır. Inheritance var olan class’ları kullanarak, yeni class’lar tanımlanmasına olanak sağlamaktadır. Bir class’dan başka bir class türetildiğinde, türetilen class, ana class tarafından tanımlanan tüm özellikleri, metotları vs. class üyelerini kalıtım yoluyla elde etmektedir. Bu yapı bir özellik veya metot grubunun farklı class’lar içerisinde tekrar tanımlanmasını engellemek için iyi bir yol sunar. Javascript’te Inheritance, prototype tabanlıdır. Yani aslında Javascript’te önceden tanımlı yada kullanıcı tarafından tanımlanan tüm object’ler, object nesnesinin prototype özelliği ile erişilebilen prototype nesnesinden türetilmektedir Fonksiyonlarında birer object olduklarını unutmamak lazım.

Prototype ile kendi methodlarımızı tanımlayabiliriz

```javascript
  // Array classına prototype ile fonksiyon tanımlıyoruz
  // Bu fonksiyon parametre olarak cb (callback fonksiyonu alıyor)

  Array.prototype.customMap = function (cb){
    //this == [].customMap(cb)
    //map fonksiyonu orjinal arrayi değiştirmez yeni bir array olusturur

    const newArray = new Array();
    for(let i = 0; i < this.length; i++){
      newArray[i] = cb(this[i])
    }
    return newArray;
  }

  // beklenilen çıktı [2,4,9]
  console.log([1,2,3].map(el => el ** 2))

```

Syntactic-Sugar

programcıların yazdıkları kodu daha kolay hatırlamak, kodun okunuşunu kolaylaştırmak ve görüntüsünü düzeltmek vb. sebepler için normal kurallar dışında özel kod yazma şekillerini kullanması anlamındaki terim. tabi bu şekerleri programla platformunu (dilinin) izin verdiği ölçüde kullanabilirsiniz.

Örnekler

```javascript
  //The for...of döngüsü for loop'un syntactic sugarı.
  let aircrafts = ['the bus', 'zephyr one', 'quinjet']

  // Aslında arka planda bu işlemi yapmaktadır.
  for (let i = 0; i < aircrafts.length; i++) {
    //istediğiniz işlemi yapabilirsiniz bu sadece örnek
    console.log(aircrafts[i])
  }
```

Performans Testleri

Bir array'i koplayamak/klonlamak
* Test Sonucları
* Array klonlama/kopyalama
  * ![clone-array](images/Ekran%20Resmi%202023-07-20%2013.02.05.png)

* Object klonlama/kopyalama  
  * ![clone-object](images/Ekran%20Resmi%202023-07-20%2013.22.27.png)
  * kullanılan deepclone fonksiyonu
  ```javascript
  function deepCopy(o) {
    // if not array or object or is null return self
    if (typeof o !== "object" || o === null) return o;
    let newO, i;
    // handle case: array
    if (o instanceof Array) {
      let l;
      newO = [];
      for (i = 0, l = o.length; i < l; i++) newO[i] = deepCopy(o[i]);
      return newO;
    }
    // handle case: object
    newO = {};
    for (i in o) if (o.hasOwnProperty(i)) newO[i] = deepCopy(o[i]);
    return newO;
  }

  function x(clone, obj) {
    for (var i in obj)
      clone[i] =
        typeof obj[i] == "object" ? x(obj[i].constructor(), obj[i]) : obj[i];
    return clone;
  }
   ```