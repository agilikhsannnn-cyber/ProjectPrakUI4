var WA_NUMBER = '628444444444';
var PH = function(n) { return 'img/ph-' + n + '.svg'; };

function waLink(t) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t); }

var CAPTION = ['Tampak depan', 'Tampak belakang', 'Detail & kelengkapan'];
var PRODUK = [{
        kat: 'iphone',
        nama: 'iPhone 13 128GB',
        kondisi: 'Mulus · Battery 89%',
        harga: 'Rp 7.499.000',
        ph: 'iphone',
        img: 'iphone13',
        spek: [
            ['Layar', '6,1" Super Retina XDR OLED'],
            ['Chip', 'A15 Bionic'],
            ['Kamera belakang', 'Dual 12 MP'],
            ['Memori', '128 GB'],
            ['Battery health', '89%'],
            ['Garansi', 'Toko 30 hari']
        ]
    },
    // salin pola yang sama untuk produk lain, pisahkan dengan koma
    {
        kat: 'iphone',
        nama: 'iPhone 11 128GB',
        kondisi: 'Mulus · Battery 87%',
        harga: 'Rp 5.999.000',
        ph: 'iphone',
        img: 'iphone11',
        spek: [
            ['Layar', '6,1" Super Retina XDR OLED'],
            ['Chip', 'A14 Bionic'],
            ['Memori', '128 GB'],
            ['Battery health', '87%'],
            ['Garansi', 'Toko 30 hari']
        ]
    },
    {
        kat: 'mac',
        nama: 'MacBook Air M1 8/256',
        kondisi: 'Mulus · Cycle 120',
        harga: 'Rp 9.999.000',
        ph: 'mac',
        img: 'macbook',
        spek: [
            ['Layar', '13,3" Retina'],
            ['Chip', 'Apple M1 8-core'],
            ['RAM / SSD', '8 GB / 256 GB'],
            ['Cycle baterai', '120'],
            ['Port', '2x Thunderbolt / USB 4'],
            ['Garansi', 'Toko 30 hari']
        ]
    },
    {
        kat: 'ipad',
        nama: 'iPad 9 64GB WiFi',
        kondisi: 'Normal · Battery 90%',
        harga: 'Rp 3.899.000',
        ph: 'ipad',
        img: 'ipad9',
        spek: [
            ['Layar', '10,2" Retina'],
            ['Chip', 'A13 Bionic'],
            ['Memori', '64 GB WiFi'],
            ['Kamera', '8 MP belakang, 12 MP depan'],
            ['Battery health', '90%'],
            ['Garansi', 'Toko 30 hari']
        ]
    },

];

document.getElementById('grid').innerHTML = PRODUK.map(function(p, i) {
    return '<div class="col-12 col-md-6 col-lg-3 item" data-kat="' + p.kat + '" data-i="' + i + '"><div class="card produk h-100"><div class="card-body">' +
        '<div class="thumb"><img src="img/' + p.img + '.png" data-ph="' + p.ph + '" alt="' + p.nama + '"></div>' +
        '<h3 class="h6 fw-bold mt-3">' + p.nama + '</h3><p class="small text-secondary mb-2">' + p.kondisi + '</p><p class="fw-bold fs-5 mb-3">' + p.harga + '</p>' +
        '<button class="btn btn-sm btn-primary rounded-pill w-100 btn-tanya" data-bs-toggle="modal" data-bs-target="#modalWA">Tanya Produk</button></div></div></div>';
}).join('');

document.getElementById('grid').addEventListener('click', function(e) {
    var item = e.target.closest('.item');
    if (!item || e.target.closest('.btn-tanya')) return;
    var p = PRODUK[item.dataset.i];
    document.getElementById('dNama').textContent = p.nama;
    document.getElementById('dKondisi').textContent = p.kondisi;
    document.getElementById('dHarga').textContent = p.harga;
    document.getElementById('dSpek').innerHTML = p.spek.map(function(s) { return '<tr><th>' + s[0] + '</th><td>' + s[1] + '</td></tr>'; }).join('');
    var f = [p.img + '.png', p.img + '-2.png', p.img + '-3.png'];
    document.getElementById('dSlides').innerHTML = f.map(function(n, k) {
        return '<div class="carousel-item' + (k ? '' : ' active') + '"><div class="detail-main"><img src="img/' + n + '" alt=""></div><div class="slide-cap">' + CAPTION[k] + '</div></div>';
    }).join('');
    document.getElementById('dInd').innerHTML = f.map(function(n, k) {
        return '<button type="button" data-bs-target="#dCar" data-bs-slide-to="' + k + '"' + (k ? '' : ' class="active" aria-current="true"') + ' aria-label="Slide ' + (k + 1) + '"></button>';
    }).join('');
    document.querySelectorAll('#dSlides img').forEach(function(im) {
        im.onerror = function() {
            im.onerror = null;
            im.src = PH(p.ph);
        };
    });
    document.getElementById('dWa').href = waLink('Halo iSecc.id, saya tertarik dengan ' + p.nama + ' (' + p.harga + '). Apakah masih tersedia?');
    bootstrap.Modal.getOrCreateInstance(document.getElementById('modalDetail')).show();
});

// Gambar belum ada -> pakai placeholder
document.querySelectorAll('img[data-ph]').forEach(function(img) {
    function pakai() {
        img.onerror = null;
        img.src = PH(img.dataset.ph);
    }
    img.onerror = pakai;
    if (img.complete && img.naturalWidth === 0) pakai();
});

// Filter produk
document.querySelectorAll('#filter button').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('#filter button').forEach(function(b) {
            b.classList.remove('active', 'btn-dark');
            b.classList.add('btn-outline-dark');
        });
        btn.classList.add('active', 'btn-dark');
        btn.classList.remove('btn-outline-dark');
        document.querySelectorAll('.item').forEach(function(it) {
            it.classList.toggle('d-none', btn.dataset.kat !== 'semua' && it.dataset.kat !== btn.dataset.kat);
        });
        var ada = document.querySelectorAll('.item:not(.d-none)').length;
        document.getElementById('kosong').classList.toggle('d-none', ada > 0);
    });
});

// Pop up WhatsApp (Tanya Produk = mode produk, Hubungi Kami = umum)
var modalWA = document.getElementById('modalWA');
modalWA.addEventListener('show.bs.modal', function(e) {
    var tombol = e.relatedTarget,
        card = tombol && tombol.closest('.card'),
        box = document.getElementById('waProduk'),
        teks;
    if (card && tombol.classList.contains('btn-tanya')) {
        var nama = card.querySelector('h3').textContent,
            harga = card.querySelector('.fs-5').textContent;
        document.getElementById('waNama').textContent = nama;
        document.getElementById('waHarga').textContent = harga;
        document.getElementById('waFoto').src = card.querySelector('img').src;
        box.classList.remove('d-none');
        teks = 'Halo iSecc.id, saya tertarik dengan ' + nama + ' (' + harga + '). Apakah masih tersedia?';
    } else {
        box.classList.add('d-none');
        teks = 'Halo iSecc.id, saya mau tanya-tanya dulu.';
    }
    document.getElementById('waGo').href = waLink(teks);
});
document.getElementById('waGo').addEventListener('click', function() { bootstrap.Modal.getInstance(modalWA).hide(); });

// Estimasi harga & form -> WhatsApp
var perangkat = document.getElementById('perangkat'),
    kondisi = document.getElementById('kondisi');

function total() { return Number(perangkat.value || 0) * Number(kondisi.value || 0); }

function hitung() { document.getElementById('hasil').textContent = 'Rp ' + Math.round(total()).toLocaleString('id-ID'); }
perangkat.addEventListener('change', hitung);
kondisi.addEventListener('change', hitung);

document.getElementById('formJual').addEventListener('submit', function(e) {
    e.preventDefault();
    var pesan = document.getElementById('pesan'),
        nama = document.getElementById('nama').value.trim(),
        wa = document.getElementById('wa').value.trim();
    pesan.classList.remove('d-none', 'alert-success', 'alert-danger');
    if (!nama || !wa || !perangkat.value || !kondisi.value) {
        pesan.classList.add('alert-danger');
        pesan.textContent = 'Lengkapi semua kolom dulu ya.';
        return;
    }
    var t = 'Halo iSecc.id, saya mau jual / tukar tambah.\nNama: ' + nama + '\nWhatsApp: ' + wa + '\nPerangkat: ' + perangkat.selectedOptions[0].text + '\nKondisi: ' + kondisi.selectedOptions[0].text + '\nPerkiraan harga: Rp ' + Math.round(total()).toLocaleString('id-ID');
    window.open(waLink(t), '_blank', 'noopener');
    pesan.classList.add('alert-success');
    pesan.textContent = 'Terima kasih, ' + nama + '. Kamu diarahkan ke WhatsApp untuk kirim penawaran.';
    this.reset();
    hitung();
});

// Muncul saat scroll + bayangan navbar
var target = document.querySelectorAll('#produk h2, #tentang .tentang, #jual .col-lg-5, #jual .col-lg-7');
target.forEach(function(el) { el.classList.add('reveal'); });
var io = new IntersectionObserver(function(l) {
    l.forEach(function(d) {
        if (d.isIntersecting) {
            d.target.classList.add('tampil');
            io.unobserve(d.target);
        }
    });
}, { threshold: 0.12 });
target.forEach(function(el) { io.observe(el); });
window.addEventListener('scroll', function() { document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 10); });
// Detail produk: klik kartu -> spesifikasi + galeri foto
var detail = document.getElementById('modalDetail');
document.querySelectorAll('.produk').forEach(function(card) {
    card.addEventListener('click', function(e) {
        if (e.target.closest('.btn-tanya')) return; // tombol Tanya Produk tetap ke pop up WA
        var item = card.closest('.item'),
            nama = card.querySelector('h3').textContent,
            harga = card.querySelector('.fs-5').textContent,
            ph = card.querySelector('img').dataset.ph;

        document.getElementById('dNama').textContent = nama;
        document.getElementById('dKondisi').textContent = card.querySelector('.small').textContent;
        document.getElementById('dHarga').textContent = harga;

        // spesifikasi
        var spek = document.getElementById('dSpek');
        spek.innerHTML = '';
        (item.dataset.spek || '').split(';').forEach(function(s) {
            var p = s.split('|');
            if (p.length < 2) return;
            var tr = document.createElement('tr'),
                th = document.createElement('th'),
                td = document.createElement('td');
            th.textContent = p[0].trim();
            td.textContent = p[1].trim();
            tr.append(th, td);
            spek.append(tr);
        });

        // galeri foto
        var daftar = (item.dataset.gal || card.querySelector('img').src).split(','),
            utama = document.getElementById('dFoto'),
            thumbs = document.getElementById('dThumbs');
        thumbs.innerHTML = '';
        daftar.forEach(function(src, i) {
            var b = document.createElement('button'),
                im = document.createElement('img');
            b.type = 'button';
            im.alt = '';
            im.onerror = function() {
                im.onerror = null;
                im.src = PH(ph);
            }; // foto belum ada -> placeholder
            im.src = src.trim();
            b.append(im);
            b.addEventListener('click', function() {
                thumbs.querySelectorAll('button').forEach(function(x) { x.classList.remove('on'); });
                b.classList.add('on');
                utama.style.opacity = 0;
                setTimeout(function() {
                    utama.src = im.src;
                    utama.style.opacity = 1;
                }, 150);
            });
            thumbs.append(b);
            if (i === 0) {
                b.classList.add('on');
                utama.src = im.src;
                utama.onerror = function() {
                    utama.onerror = null;
                    utama.src = PH(ph);
                };
            }
        });

        document.getElementById('dWa').href = waLink('Halo iSecc.id, saya tertarik dengan ' + nama + ' (' + harga + '). Apakah masih tersedia?');
        bootstrap.Modal.getOrCreateInstance(detail).show();
    });
});