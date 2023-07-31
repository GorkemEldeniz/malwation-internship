## ReactJS Elements 1

Event Nedir?
Event, HTML elementlerinde gerçekleşen olaylardır. Bir event tarayıcının yahut kullanıcının neden olduğu bir şey olabilir. Ve biz javascript yardımı ile bu event ‘leri (olayları) yakalayabiliriz.

React Event'in farkları

- HTML elementlerinde event isimleri lowercase iken (onclick) React ‘te camelCase ‘dir (onClick).
- HTML elementlerinde fonksiyon isimleri ilgili event ‘e “string” olarak atama yapılırken React ‘te direkt “fonksiyon” olarak atama yapılır. Buna bir örnek verelim :

```js
    //HTML
    <button onclick='send()'> Send Data </button>
    //ReactJs
    <button onClick={send}> Send Data </button>
```

- React ’teki diğer bir farklılık ise, event ‘lerdeki varsayılan davranışın false değeri döndürülerek engellenemiyor oluşudur. Bunun için preventDefault şeklinde açıkça yazarak tarayıcıya belirtmeniz gerekir.

```js
//HTML
<a href='#' onclick='alert(‘Linke tıklandı.’); return false'>
	{" "}
	Test{" "}
</a>;
//REACT
const Test = () => {
	function handleClick(e) {
		e.preventDefault();
		alert("Linke tıklandı.");
	}
	return (
		<a href='#' onClick={handleClick}>
			{" "}
			Test{" "}
		</a>
	);
};
```

- Bir fark daha … Yukarıda kullandığımız handleClick(e) fonksiyonunun aldığı “e” parametresi sentetik (yapay) bir event ‘tir.
  - React cross-browser uyumluluğunu sağlamak adına tarayıcının native event yapısına çok benzeyen, sentetik (yapay) bir event nesnesi ile sizin yazmış olduğunuz event ‘leri sarmalayarak bütün tarayıcılarda aynı çalışacak şekilde oluşturuyor.

React Hooks Nedir?

React Hooks, React’ın en kullanışlı özelliklerinden biridir. Hooks, hazırda yer alan state ve lifecycle gibi React özelliklerine erişmemizi sağlayan tekrar kullanılabilir javascript fonksiyonlarıdır. Kod karmaşıklığından bizi kurtarır. React fonksiyonlarının içinde kullanılır.

Başlıca React Hook’ları:

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useId

useState Nedir?

useState bir state hookudur. Herhangi değişkenleri saklayıp react bileşen fonksiyonlarında erişmeye, şartlı olarak kullanmaya, güncellemeyi sağlar.

useEffect Nedir?

useEffect Hook’u ile component mount edildiğinde hangi fonksiyonun çalıştırılacağına karar verilir. Anonim fonksiyon ve dependency parametrelerini alır.

useRef

Refler React için birer “escape hatch” olarak tanımlanır.
React sistemlerini kullanmadan bir işlem yapmak için tavsiye edilir.

Kullanım örneği

```js
// Butona basıldığında inputa focus olmasını sağlar
function focusOnInput() {
	const inputToFocus = useRef(null);
	const clickHandler = () => {
		inputToFocus.current.focus();
	};
	return (
		<>
			<input ref={inputToFocus} type='text' />
			<button onClick={clickHandler}>Focus on Input</button>
		</>
	);
}

//eski ve anlık değerleri yakalamak için kullanılabilir
export default function App() {
	const prevValue = useRef(0);
	const [ctr, setCtr] = useState(0);

	useEffect(() => {
		console.log("ctr:", ctr, "prevValue:", prevValue);
	}, [prevValue, ctr]);

	return (
		<div className='App'>
			<p>{ctr}</p>
			<button
				onClick={() => {
					setCtr((ctr) => {
						prevValue.current = ctr;
						return ctr + 1;
					});
				}}
			>
				Increase by 1
			</button>
		</div>
	);
}
```
