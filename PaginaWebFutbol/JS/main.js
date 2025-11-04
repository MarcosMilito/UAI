/* =================== CONTACTO =================== */
(function contactoModule () {
  const form = document.getElementById('frm-contacto');
  if (!form) return; // si no hay form en la página, no hace nada

  const email = document.getElementById('email');
  const replyHidden = document.getElementById('replyto-hidden');

  form.addEventListener('submit', () => {
    if (replyHidden && email) replyHidden.value = email.value || '';
    setTimeout(() => alert('Gracias por su consulta. En breve la procesaremos.'), 0);
  });
})();

/* ==================== TIENDA ==================== */
(function tiendaModule () {
  // Detectamos si estamos en la página de Tienda por cualquiera de estos ids
  const el = (id) => document.getElementById(id);
  const grid = el('store-grid') || el('grid') || el('tienda-root');
  if (!grid) return; // si no hay grilla, no estamos en Tienda

  // Utils
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];
  const ARS = n => n.toLocaleString('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 });
  const randInt = (min,max) => Math.floor(Math.random()*(max-min+1))+min;

  // Tu catálogo base (SIN CAMBIOS)
  const base = [
    {id:1,  name:'Camiseta Titular 24/25 - River Plate', type:'camiseta', img:'https://celadasa.vtexassets.com/arquivos/ids/561570-800-auto?v=638852494792630000&width=800&height=auto&aspect=true'},
    {id:2,  name:'Camiseta Alternativa Club - River Plate', type:'camiseta', img:'https://sevensportio.vtexassets.com/arquivos/ids/401683-800-auto?v=638623678090300000&width=800&height=auto&aspect=true'},
    {id:3,  name:'Buzo Entrenamiento - Boca Juniors', type:'buzo', img:'https://redsport.vtexassets.com/arquivos/ids/1210784/BUZO-ADIDAS-ENTRENAMIENTO-CON-CAPUCHA-DE-BOCA-JUNIORS-TIRO-25-COMPETITION.jpg?v=638863726452100000'},
    {id:4,  name:'Campera Rompeviento - Independiente de Avellaneda', type:'campera', img:'https://newsport.vtexassets.com/arquivos/ids/19635759-800-auto?v=638671200145070000&width=800&height=auto&aspect=true'},
    {id:5,  name:'Botines Adidas 2019', type:'botines', img:'https://img.pacifiko.com/PROD/resize/1/500x500/YTNkYzE1MT_1_1747626012.jpeg'},
    {id:6,  name:'Nike Mercurial Superfly 10 Elit', type:'botines', img:'https://nikearprod.vtexassets.com/arquivos/ids/1328463-1200-1200?width=1200&height=1200&aspect=true'},
    {id:7,  name:'Jordan', type:'accesorio', img:'https://nikearprod.vtexassets.com/arquivos/ids/1214615-1000-1000?v=638664360417430000&width=1000&height=1000&aspect=true'},
    {id:8,  name:'Nike DriFIT Rise', type:'accesorio', img:'https://nikearprod.vtexassets.com/arquivos/ids/732079-1200-1200?width=1200&height=1200&aspect=true'},
    {id:9,  name:'Camiseta Retro 90s - Racing Club', type:'camiseta', img:'https://acdn-us.mitiendanube.com/stores/001/312/744/products/faetsrytyuserdytyiuu1-55a7fb9ffe53c3341b16759090524205-640-0.jpg'},
    {id:10, name:'Rosario Central - Buzo Tiempo Libre', type:'buzo', img:'https://lecoqsportif.com.ar/wp-content/uploads/2025/01/LTN0225182-1-scaled.jpg'},
    {id:11, name:'Camiseta Visitante 24/25 - Riestra', type:'camiseta', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxK2FodWapIqTKJNP833JXmlQq1f7c5IC1uA&s'},
    {id:12, name:'Buzo Canguro - River Plate', type:'buzo', img:'https://www.digitalsport.com.ar/files/products/572d0f8d91db0-372283-1200x1200.jpg'},
    {id:13, name:'Buzo Técnico con Cierre - Talleres de Cordoba', type:'buzo', img:'https://newsport.vtexassets.com/arquivos/ids/20405228-800-auto?v=638869959700200000&width=800&height=auto&aspect=true'},
    {id:14, name:'Buzo Termico - Boca Juniors', type:'buzo', img:'https://powersport.com.ar/wp-content/uploads/2023/07/190.jpg'},
    {id:15, name:'Campera Impermeable - Racing Club', type:'campera', img:'https://locademia.racingclub.com.ar/Image/0/2000_2000-campera_con_capucha_negra_talle_S_10.jpg'},
    {id:16, name:'Campera Puffer Ligera - Rosario Central', type:'campera', img:'https://acdn-us.mitiendanube.com/stores/001/165/935/products/campera_abrigo_rosario_central_adm_short_jacket_negro_homber_lto0225384-2-4ff206c1d86f68bfd417541503513118-1024-1024.jpg'},
    {id:17, name:'Campera Técnica Windstopper - River Plate', type:'campera', img:'https://www.digitalsport.com.ar/files/products/5c7fc270a4045-469168-500x500.jpg'},
    {id:18, name:'Zapatillas Running Pro', type:'zapatillas', img:'https://www.stockcenter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw8872d807/products/PU379383-01/PU379383-01-6.JPG'},
    {id:19, name:'Zapatillas Street Classic', type:'zapatillas', img:'https://sevensportio.vtexassets.com/arquivos/ids/502411-800-auto?v=638838595148430000&width=800&height=auto&aspect=true'},
    {id:20, name:'Zapatillas Turf Fútbol', type:'zapatillas', img:'https://http2.mlstatic.com/D_NQ_NP_742223-CBT89411532910_082025-O.webp'},
    {id:21, name:'Camiseta Entrenamiento Manga Larga - Independiente de Avellaneda', type:'camiseta', img:'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/713917/01/fnd/ARG/fmt/png'},
    {id:22, name:'Remera Pre-Match - Velez', type:'camiseta', img:'https://acdn-us.mitiendanube.com/stores/268/104/products/prematch-azul-escudo-nuevo-sin-saphirus-01-578013170061e3f09a17531947033992-1024-1024.webp'},
    {id:23, name:'Buzo de Entrenamiento - Argentinos Juniors', type:'buzo', img:'https://newsport.vtexassets.com/arquivos/ids/20435099/3AJ160015422-A.jpg?v=638881173811230000'},
    {id:24, name:'Musculosa - Boca Juniors', type:'remera', img:'https://bocashop.vteximg.com.br/arquivos/ids/171712-1000-1000/JP3311_1.jpg?v=638852162293300000'},
    {id:25, name:'Campera Rompeviento - Boca Juniors', type:'campera', img:'https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw61675cf5/products/ADIS5589/ADIS5589-1.JPG'},
    {id:26, name:'Camiseta Titular 24/25 - Velez', type:'camiseta', img:'https://acdn-us.mitiendanube.com/stores/268/104/products/home25-escudo-nuevo-01-50d485882c267d786417449237462403-1024-1024.jpg'},
    {id:27, name:'Zapatillas Indoor Court', type:'zapatillas', img:'https://rossettiar.vtexassets.com/arquivos/ids/1859002-800-auto?v=638697235620930000&width=800&height=auto&aspect=true'},
    {id:28, name:'Medias Deportivas - Pony', type:'accesorio', img:'https://pony.ar/media/catalog/product/cache/0457824bba97e1f5f9a1743c78116b86/0/6/06-06-24_pony_medias_hombre0026r.jpg'},
    {id:29, name:'Canilleras Pro Adidas', type:'accesorio', img:'https://assets.adidas.com/images/w_600,f_auto,q_auto/79215dcb57d44e2893f19b3a51f5429e_9366/Canilleras_Tiro_Club_Blanco_IP3995_01_standard.jpg'},
    {id:30, name:'Guantes Arquero DRB Unisex Estadios 24 -River Plate', type:'accesorio', img:'https://www.bompie.com.ar/media/catalog/product/cache/1e7c11b43132c034d445b386916b52f7/1/9/198-47847b.jpg'}
  ];

  const priceRange = {
    remera:[45000,120000], camiseta:[45000,120000],
    buzo:[60000,160000], campera:[80000,220000],
    zapatillas:[90000,300000], botines:[120000,350000],
    accesorio:[8000,40000]
  };
  const sizesRopa = ['S','M','L'];
  const sizesCalzado = ['38','39','40','41','42'];

  const randomSizes = (type) => {
    const calzado = (type==='zapatillas' || type==='botines');
    const pool = calzado ? sizesCalzado : sizesRopa;
    const count = randInt(2,3);
    return pool.slice().sort(()=>Math.random()-0.5).slice(0,count);
  };
  const randomPrice = (type) => {
    const [min,max] = priceRange[type] || [20000,80000];
    return randInt(min,max);
  };

  const catalog = base.map(p => ({
    ...p,
    price: randomPrice(p.type),
    sizes: randomSizes(p.type)
  }));

  function renderProducts(){
    grid.innerHTML = catalog.map(p => `
      <article class="product" data-id="${p.id}">
        <a class="product-img" style="background-image:url('${p.img}')" href="#" aria-label="${p.name}"></a>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-sub">${p.type[0].toUpperCase()+p.type.slice(1)}</p>
        <div class="product-meta">
          <span class="price">${ARS(p.price)}</span>
          <div class="buy">
            <select class="select size">
              <option value="">Talle</option>
              ${p.sizes.map(s=>`<option value="${s}">${s}</option>`).join('')}
            </select>
            <button class="btn add" type="button">Agregar</button>
          </div>
        </div>
      </article>
    `).join('');

    $$('.product .add', grid).forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const card = btn.closest('.product');
        const id = +card.dataset.id;
        const prod = catalog.find(x=>x.id===id);
        const size = $('.size', card).value;
        if(!size){ alert('Elegí un talle.'); return; }
        addToCart({ id: prod.id, name: prod.name, price: prod.price, size, img: prod.img });
      });
    });
  }
  renderProducts();

  // Carrito
  let cart = [];
  const cartList  = el('cartItems');
  const cartTotal = el('cartTotal');
  const clearBtn  = el('clearCart');
  const payBtn    = el('checkout');

  function renderCart(){
    if (!cartList || !cartTotal) return; // por si en tu HTML cambió el id

    if(cart.length===0){
      cartList.innerHTML = '<p style="color:#cbd5e1">Tu carrito está vacío.</p>';
      cartTotal.textContent = ARS(0);
      return;
    }
    cartList.innerHTML = cart.map(it => `
      <div class="ci" style="display:flex; gap:10px; align-items:center; border:1px solid var(--panel-border); border-radius:12px; padding:10px; background:rgba(255,255,255,.04);">
        <div style="width:60px; height:60px; background-image:url('${it.img}'); background-size:cover; background-position:center; border-radius:10px;"></div>
        <div style="flex:1;">
          <div style="font-weight:700;">${it.name}</div>
          <div style="color:var(--muted); font-size:13px;">Talle <strong>${it.size}</strong> · ${ARS(it.price)}</div>
          <div style="margin-top:6px; display:flex; gap:8px; align-items:center;">
            <button onclick="changeQty(${it.id}, '${it.size}', -1)" class="qbtn">−</button>
            <span>${it.qty}</span>
            <button onclick="changeQty(${it.id}, '${it.size}', 1)" class="qbtn">+</button>
            <button onclick="removeFromCart(${it.id}, '${it.size}')" class="btn btn-secondary">Quitar</button>
          </div>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((acc, it)=> acc + it.price * it.qty, 0);
    cartTotal.textContent = ARS(total);
  }

  function addToCart(item){
    const i = cart.findIndex(x => x.id===item.id && x.size===item.size);
    if(i>-1) cart[i].qty += 1;
    else cart.push({...item, qty:1});
    renderCart();
  }
  function removeFromCart(id,size){
    cart = cart.filter(x => !(x.id===id && x.size===size));
    renderCart();
  }
  function changeQty(id,size,delta){
    const it = cart.find(x => x.id===id && x.size===size);
    if(!it) return;
    it.qty = Math.max(1, it.qty + delta);
    renderCart();
  }

  if (clearBtn) clearBtn.addEventListener('click', ()=>{ cart = []; renderCart(); });
  if (payBtn) payBtn.addEventListener('click', ()=>{
    if(cart.length===0){ alert('Tu carrito está vacío.'); return; }
    const detalle = cart.map(i => `${i.qty}× ${i.name} (Talle ${i.size}) - ${ARS(i.price*i.qty)}`).join('\n');
    alert(`Resumen de compra:\n\n${detalle}\n\nTotal: ${cartTotal.textContent}\n\n*Demo sin pago online.*`);
  });

  // Exponer helpers que usa el HTML inline
  window.changeQty = changeQty;
  window.removeFromCart = removeFromCart;
})();

/* ================== DESTACADOS ================== */
(function destacadosModule () {
  const tblG = document.getElementById('tbl-goles');
  const tblA = document.getElementById('tbl-asist');
  if (!tblG && !tblA) return; // si no están las tablas, no corre

  const goleadores = [
    {pos:1,  nombre:"Adrián Martínez", equipo:"Racing Club",     P:11, G:9},
    {pos:2,  nombre:"Tomás Molina",    equipo:"Argentinos Jrs.", P:16, G:8},
    {pos:3,  nombre:"Nicolás Fernández",equipo:"Belgrano (Córdoba)", P:18, G:8},
    {pos:4,  nombre:"Gabriel Ávalos",  equipo:"Independiente",   P:16, G:7},
    {pos:5,  nombre:"Andrés Vombergar",equipo:"San Lorenzo",     P:17, G:7},
    {pos:6,  nombre:"Elías Torres",    equipo:"Racing Club",     P:18, G:6},
    {pos:7,  nombre:"Miguel Merentiel",equipo:"Boca Juniors",    P:16, G:6},
    {pos:8,  nombre:"Jhonatan Candia", equipo:"Barracas Central",P:14, G:6},
    {pos:9,  nombre:"Alex Luna",       equipo:"Instituto (Cba.)",P:18, G:5},
    {pos:10, nombre:"Ignacio Russo",   equipo:"Tigre",           P:16, G:5},
    {pos:11, nombre:"Miguel Borja",    equipo:"River Plate",     P:16, G:5},
    {pos:12, nombre:"Facundo Bruera",  equipo:"Barracas Central",P:16, G:5},
    {pos:13, nombre:"Matko Miljevic",  equipo:"Huracán",         P:15, G:5},
    {pos:14, nombre:"Leonardo Heredia",equipo:"Central Córdoba (SdE)", P:14, G:5},
    {pos:15, nombre:"Gastón Togni",    equipo:"Defensa y Justicia", P:12, G:5},
    {pos:16, nombre:"Sebastián Villa", equipo:"Indep. Rivadavia",P:16, G:4},
    {pos:17, nombre:"Rodrigo Castillo",equipo:"Lanús",           P:16, G:4},
    {pos:18, nombre:"Marcelino Moreno",equipo:"Lanús",           P:16, G:4},
    {pos:19, nombre:"Lucas Gamba",     equipo:"Unión (Santa Fe)",P:16, G:4},
    {pos:20, nombre:"Vicente Taborda", equipo:"Platense",        P:15, G:4},
  ];

  const asistencias = [
    {pos:1,  nombre:"Sebastián Villa", equipo:"Independiente Rivadavia", P:16, A:4},
    {pos:2,  nombre:"Luis Miguel Angulo",equipo:"Talleres (Córdoba)",    P:16, A:4},
    {pos:3,  nombre:"Éver Banega",     equipo:"Newell's Old Boys",       P:15, A:4},
    {pos:4,  nombre:"Gastón Martínez", equipo:"Racing Club",              P:14, A:4},
    {pos:5,  nombre:"Víctor Malcorra", equipo:"Rosario Central",         P:12, A:4},
    {pos:6,  nombre:"Javier Ruiz",     equipo:"Barracas Central",        P:11, A:4},
    {pos:7,  nombre:"Leandro Lozano",  equipo:"Argentinos Juniors",      P:16, A:3},
    {pos:8,  nombre:"Sasha Marcich",   equipo:"Lanús",                   P:16, A:3},
    {pos:9,  nombre:"Alan Lescano",    equipo:"Argentinos Juniors",      P:16, A:3},
    {pos:10, nombre:"Guido Mainero",   equipo:"Platense",                P:16, A:3},
    {pos:11, nombre:"Emanuel Coronel", equipo:"Rosario Central",         P:16, A:3},
    {pos:12, nombre:"Maximiliano Salas",equipo:"River Plate",            P:16, A:3},
    {pos:13, nombre:"Miguel Merentiel",equipo:"Boca Juniors",            P:16, A:3},
    {pos:14, nombre:"Felipe Loyola",   equipo:"Independiente",           P:15, A:3},
    {pos:15, nombre:"Alexis Soto",     equipo:"Defensa y Justicia",      P:14, A:3},
    {pos:16, nombre:"Jabes Saralegui", equipo:"Tigre",                   P:14, A:3},
    {pos:17, nombre:"Elías Cabrera",   equipo:"Tigre",                   P:14, A:3},
    {pos:18, nombre:"Carlos Palacios", equipo:"Boca Juniors",            P:13, A:3},
    {pos:19, nombre:"Ramiro Ruiz Rodríguez", equipo:"Atlético Tucumán", P:12, A:3},
    {pos:20, nombre:"Gonzalo Montiel", equipo:"River Plate",             P:12, A:3},
  ];

  function ensureTbody(tableEl) {
    if (!tableEl) return null;
    let tb = tableEl.querySelector('tbody');
    if (!tb) {
      tb = document.createElement('tbody');
      tableEl.appendChild(tb);
    }
    return tb;
  }

  function renderTabla(tableEl, filas, key) {
    const tb = ensureTbody(tableEl);
    if (!tb || !Array.isArray(filas)) return;
    tb.innerHTML = filas.map(r => `
      <tr>
        <td class="pos">${r.pos}</td>
        <td>${r.nombre}</td>
        <td>${r.equipo}</td>
        <td class="num">${r.P}</td>
        <td class="num"><strong>${r[key]}</strong></td>
      </tr>
    `).join('');
  }

  if (tblG) renderTabla(tblG, goleadores, 'G');
  if (tblA) renderTabla(tblA, asistencias, 'A');
})();