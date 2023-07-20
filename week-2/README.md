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

JS Best Practice

*  == **Yerine** === **Kullan**
    * == type converting yaptığı için hatalara yol açabilir
* Kısaltmaları kullanma
    * ```js
      // bu kodun karşılığı
      if (someVariableExists)
        x = false
        anotherFunctionCall();
      // bu örnek değil
      if (someVariableExists){
        x = false
        anotherFunctionCall();
      }
      //Budur
      if (someVariableExists){
        x = false
      }
      anotherFunctionCall();
      ```
    * Kısaltmalar sadece tek satırlık kod bloklarında kullanılması daha uygundur
    * ```js
      // Bunun yerine
        if(2 + 2 === 4){
          return 'nicely done';
        }
      // Bu kullanılabilir  
        if(2 + 2 === 4) return 'nicely done';
      ```  
  * Döngü içinde gereksiz atamalardan kaçınılmalı
    * ```js
        //Kötü örnek
        for(let i = 0; i < someArray.length; i++) {
          let container = document.getElementById('container');
          container.innerHtml += 'my number: ' + i;
          console.log(i);
        }
        //İyi Örnek
        let container = document.getElementById('container');
        for(let i = 0, len = someArray.length; i < len;  i++) {
          container.innerHtml += 'my number: ' + i;
          console.log(i);
          }
      ``` 
  * Global Tanımlamaları azalt
    * Sadece spesifik işlevleri olan fonksiyonları obje şeklinde tanımla 
    * ```js
        //Kötü örnek
        let name = 'Jeffrey';
        let lastName = 'Way';
        function doSomething() {...}
        console.log(name); // Jeffrey -- or window.name

        //İyi örnek
        let DudeNameSpace = {
          name : 'Jeffrey',
          lastName : 'Way',
          doSomething : function() {...}
        }
        console.log(DudeNameSpace.name);
      ```
  * Yorum satırların iyi kullanmak
    * gereksiz yorumlardan kaçınmak ve ihtiyaç duyulan yerlerde kullanmak

  * new Object() **Yerine** {} **Kullan**
    * Bir zararı yok ama okunaklığı açısında genellikle object literal tercih edilir
    * ```js
      //Kötü örnek
      var o = new Object();
        o.name = 'Jeffrey';
        o.lastName = 'Way';
        o.someFunction = function() {
          console.log(this.name);
        }
      //İyi Örnek
      var o = {
        name: 'Jeffrey',
        lastName = 'Way',
        someFunction : function() {
            console.log(this.name);
        }
        };
      ```      
  * for ... in kullanırken dikkat et
    * ```js
      // kontrol et
      for (key in object) {
        if(object.hasOwnProperty(key)) {
          //...then do something...
        }
      }
      ```
  * İhtiyaç olmadıkça kütüphane kullanma
    * jQuery,lodash gibi kütüphanelerdeki methodlar çok kullanışlı olabilirler ama bazılarını sadece js kullanarak da yazabilirsin      

  * Okunaklılık açısından **arrow fonksiyonlarını** kullanabilirsin
    * ```js
      //Kötü Örnek
      const nums = [1,2,3,4,5,6,7,8];
      const even_nums = nums.filter( function (num) { return num%2 == 0; } )
      
      //İyi Örnek
      const even_nums = nums.filter(num => num%2 == 0)
      ```
  * Birden çok promiseleri **Promise.all()** fonksiyonunu kullanarak paralel bir şekilde çalıştırabilirsin

  * ```js
      const urls = ["https://en.wikipedia.org/wiki/Canada", "https://en.wikipedia.org/wiki/Nigeria", "https://en.wikipedia.org/wiki/Vietnam"]
      const countryInfo = await Promise.all(urls.map( async url => {
        const resp = await fetch(url);
        return resp.text();
      }));
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

  function nestedObjectClone(clone, obj) {
    for (var i in obj)
      clone[i] =
        typeof obj[i] == "object" ? x(obj[i].constructor(), obj[i]) : obj[i];
    return clone;
  }
  ```  
## Javascript Gelişimi

JS Tarihçesi yazımda Javascript’in gelişimi hakkında konuşurken Node ile JavaScript’in sadece tarayıcı içerisinde değilde, Sunucu, Desktop, Mobil ve iOT cihazlarında çalışabilir hale gelmesinden bahsetmiştim. Bu değişim geliştireceğimiz uygulamaların büyüklüklerini veya gereksinimlerini değiştirmiştir.

JS ile daha büyük proje geliştirme ihtiyacı, daha büyük ekipleri oluşturmayı ve beraber çalışabilmelerini zorunlu hale getirmiştir.

Bunun için işi soyutlamak(abstraction), parçalara ayırmak(module) ve birbirinin rahat bir şekilde kullanımına(composition) sunabilmeniz gerekiyor.

JS Modüllerindeki gelişim bunu (IIFE →CJS→AMD →ES6) sağlamıştır. Node gelişimi ile birlikte geliştirilen modüllerin bir Repo da toplanıp rahatça indirilebilmesi için NPM geliştirilmiştir.

Peki bu Node modüllerini sadece Sunucu tarafında mı kullanacağız? Frontend geliştiricileri de bu kütüphanelerden nasıl faydalanabilir. Browserify , Webpack gibi araçlar çıkmış, Babel sayesinde burdaki Tarayıcı uyumsuzlukları Babel dönüştürücüsü ile çözülmeye başlanmıştır.

Webpack, Babel, SCSS vb.. preprocessor yapıları Pandora’nın kutusunu açmıştır. Biz geliştiriciler artık tarayıcının anladığı JS ve CSS seviyesinde kod yazmak zorunda kalmayacaktık. Bu gelişim aslında eskiden yaşanan bir gelişimin benzeri;

Bu özellikler şimdi JS ekosisteminde var oluyor. , Typescript, Sass dilleri kullanılabilir hale geldik. React projelerinde yer alan JSX kullanımı da bu Preprocessor sayesinde aslında arka planda React API dönüştürülerek çağrımları gerçekleştirir. Bu sayede geliştiricilerin Imperative API kullanma detaylarından soyutlayarak Declarative tanımla **<MyComp>** çok daha hızlı kod geliştirilebilir bir hale getirmiştir.

## Typescript Ortaya Çıkışı  

Büyük projelerde herkesin bu dikkati gösterMemesi, projeye sonradan dahil olan, veya JS konularına hakim olmayan geliştiricilerin projede oluşturabilecekleri hataları minimize etmek için TypeScript gibi Type güvenliği sağlayan diller kullanırız.

Bundan dolayı araya bir katman daha koyarak geliştirdiğimiz kodumuzun transpile edilmesi ve yazdığımız JS kodlarında oluşacak hataları daha öncesinden tespit etmiş oluruz. Bu aşamada JS dışındaki dilleri → JS diline dönüştürecek ara transpiler ihtiyaç bulunur. Bunlardan bazıları;

## Dönüştürücü (Compiler, Transpiler Kavramları)

Dönüştürücüleri compiler , bazende transpiler ile adlandırıyoruz. Aslında Typscript, Babel, Sass gibi dönüştürülere Transpiler deniliyor. Bunun nedeni birbirine yakın seviyedeki dillerin bir birine dönüştürülmesi yani TypeScript → EcmaScript(JS) çıktısını geliştirici aynı şekilde okuyup anlayabildiği için bu tarz dönüştürücülere Source-to-Source Compiler deniliyor.

![Şema](https://media.geeksforgeeks.org/wp-content/uploads/20220406145111/TypeScriptCompilation.JPG)

Typescript Kullanmanın Faydaları

Derleme: Özelliklerinde bahsettiğim gibi JavaScript yorumlamalı(interpreted) bir dildir, derleme aşaması yoktur, bu nedenle kod çalışana dek hata tespiti yapılamaz ve hata varsa tüm kodun gözden geçirilmesi gerekir ve bu çok zaman alabilir. TypeScript dönüştürücüsü derleme aşamasında hata denetimi sağlar ve bu soruna çözüm getirir.
Daha iyi kod yapılandırması ve nesneye yönelik programlama teknikleri içerir.Javascript diline göre daha kolay okunabilir ve düzenlenebilir bir dil olan TypeScript, nesne yönelimli yapıya sahiptir. Sınıflar, modüller, arayüzler gibi özellikleri destekler.
JavaScript koduna göre sağladığı en büyük avantajlardan bir diğeride kolay okunabilir ve düzenlenebilir bir dildir.


TypeScript ve JavaScript Arasında Farklar Nelerdir?

TypeScript statik veri tipine sahiptir, JavaScript ise dinamik veri tipine sahiptir.
TypeScript ile JavaScript olarak tasarlanmış büyük ve karmaşık projelerin geliştirme aşaması çok daha kısa sürelere indirilebilir ve müdahalede edilebilir.
TypeScript nesne yönelimli program dildir, JavaScript ise betik dildir.

![typescript-javascript](https://dunebook.com/wp-content/uploads/2017/03/Typescript-and-the-Javascript-code.jpg)

Typescript Best Practise

* Dogru veri tiplerini kullan mümkün olduğunca **any** den kaçın
* typescript config dosyasından **strict** modu aktifleştirerek kullan
    * Strict Mode (kısaca SM) EsmaScript 5 ile birlikte duyurulan ve JavaScript’deki esnek yazım biçimini ortadan kaldıran yeni bir özelliktir. Bu özelliği kullanarak yazılan JavaScript kodunun bütün yorumlayıcılarda aynı şekilde yorumlanması hedeflenmiştir.
    * ![strictMode](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*6NNYdRlo1spH1-71XtuGSg.png)

* Sabit elemanlı diziler için tuple tip atamasını kullan
    * ```ts
        let marks: number[] = [1, 2, 3];
        // sabit değişkenler
        let marks:[number, number] = [1, 2]; 
      ``` 
* Tekrar eden veri tiplerinde mutlaka atama yap
    * ```ts
        type Details = {name: string, age: number};
        let man: Details = {name = "john", age=30};
        let woman: Details = {name = "Anne", age=32};
      ```
* ESLint Airbnb gibi linterlar kullanılabilir
* Prettier gibi code formatterlar kullanılabilir
