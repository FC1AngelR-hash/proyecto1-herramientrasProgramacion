<script lang="ts">
	import HeroScene from '$lib/components/HeroScene.svelte';

	let menu = $state(false);
	const words = ['BRILLO', 'PROTECCIÓN', 'CERÁMICO', 'DETALLADO', 'PRECIO', 'RESULTADO'];
	const links = [
		['#catalogo', 'CATÁLOGO'],
		['#kits', 'KITS'],
		['#nosotros', 'NOSOTROS'],
		['/sign-in', 'CUENTA']
	];
	const products = [
		{ name: 'Shampoo pH neutro', price: '$18', desc: 'Lava sin quitar cera ni recubrimiento.' },
		{ name: 'Cera de carnauba', price: '$32', desc: 'Brillo profundo y agua que perla al instante.' },
		{ name: 'Sellador cerámico', price: '$64', desc: 'Hasta 12 meses de protección hidrofóbica.' },
		{ name: 'Limpia rines', price: '$16', desc: 'Disuelve polvo de freno sin dañar el aluminio.' },
		{ name: 'Interior APC', price: '$14', desc: 'Plásticos, tela y piel en un solo producto.' },
		{ name: 'Pack 6 microfibras', price: '$22', desc: 'Sin pelusa, para secar y dar el toque final.' }
	];
</script>

<div class="relative min-h-screen overflow-hidden bg-[#14081f] text-white">
	<HeroScene />
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-950/30 via-transparent to-[#14081f]"
	></div>

	<header class="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
		<a href="/" class="text-xl font-semibold tracking-[0.28em]">AURA DETAIL</a>
		<nav class="hidden items-center gap-6 text-[11px] tracking-[0.22em] md:flex">
			{#each links as [href, label]}
				<a class="text-violet-100/70 hover:text-white" {href}>{label}</a>
			{/each}
			<a
				href="#catalogo"
				class="rounded-full border border-violet-300/40 px-4 py-2 hover:bg-violet-400/15">COMPRAR</a
			>
			<button
				class="rounded-full border border-violet-300/40 px-4 py-2"
				onclick={() => (menu = !menu)}>MENÚ</button
			>
		</nav>
		<button
			class="rounded-full border border-violet-300/40 px-4 py-2 text-xs md:hidden"
			onclick={() => (menu = !menu)}>MENÚ</button
		>
	</header>

	{#if menu}
		<div
			class="absolute right-6 top-20 z-20 w-56 space-y-3 rounded-2xl border border-violet-300/20 bg-violet-950/80 p-5 text-sm backdrop-blur"
		>
			{#each links as [href, label]}
				<a class="block text-violet-100" {href} onclick={() => (menu = false)}>{label}</a>
			{/each}
			<a class="block" href="/sign-in">CUENTA</a>
		</div>
	{/if}

	<aside
		class="absolute top-1/3 left-6 z-10 hidden space-y-4 text-[10px] tracking-[0.35em] text-violet-200/40 md:block"
	>
		{#each words as w, i}
			<p class={i === 0 ? 'text-fuchsia-200' : ''}>{w}</p>
		{/each}
	</aside>

	<section
		class="relative z-10 mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center px-6 text-center"
	>
		<p class="text-[11px] tracking-[0.35em] text-fuchsia-200/80">CAR DETAILING PRO</p>
		<h1 class="mt-3 text-4xl font-semibold tracking-wide md:text-6xl">
			BRILLO DE SHOWROOM<br />EN CASA
		</h1>
		<p class="mt-5 max-w-xl text-sm leading-relaxed text-violet-100/75">
			Productos profesionales de car detailing: lavado, cerámica, cera e interior. Fórmulas que
			protegen la pintura y venden el resultado, no solo el frasco.
		</p>
		<a
			href="#catalogo"
			class="mt-8 rounded-full border border-violet-200/40 bg-violet-500/20 px-6 py-3 text-xs tracking-[0.25em] hover:bg-violet-400/30"
		>
			VER CATÁLOGO
		</a>
	</section>
</div>

<section id="catalogo" class="bg-[#1a0b2e] px-6 py-20 md:px-10">
	<div class="mx-auto max-w-6xl">
		<p class="text-xs tracking-[0.3em] text-fuchsia-300">CATÁLOGO</p>
		<h2 class="mt-2 text-3xl font-semibold">Todo para un detailing completo</h2>
		<p class="mt-3 max-w-2xl text-violet-200/70">
			De la espuma al sellado cerámico. Elige por pieza o arma tu kit y deja el auto con aspecto de
			taller premium.
		</p>
		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each products as p}
				<article class="rounded-2xl border border-violet-400/20 bg-violet-950/50 p-5">
					<h3 class="text-lg font-medium">{p.name}</h3>
					<p class="mt-2 text-sm text-violet-200/70">{p.desc}</p>
					<div class="mt-4 flex items-center justify-between">
						<span class="text-fuchsia-200">{p.price}</span>
						<a
							href="/sign-up"
							class="rounded-full border border-violet-300/30 px-3 py-1 text-xs hover:bg-violet-400/20"
							>Comprar</a
						>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="kits" class="bg-[#12071c] px-6 py-16 md:px-10">
	<div class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<div>
			<p class="text-xs tracking-[0.3em] text-fuchsia-300">KIT MÁS VENDIDO</p>
			<h2 class="mt-2 text-3xl font-semibold">Kit Showroom en 3 pasos</h2>
			<p class="mt-3 max-w-lg text-violet-200/70">
				Shampoo + cera + microfibras. El camino más rápido a un auto limpio, protegido y con brillo
				húmedo.
			</p>
		</div>
		<p class="text-4xl font-semibold text-fuchsia-200">$58</p>
	</div>
</section>

<section id="nosotros" class="bg-[#1a0b2e] px-6 py-16 md:px-10">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-semibold">Hecho para aficionados y talleres</h2>
		<p class="mt-4 text-violet-200/70">
			Misma química que usan detailers: concentrados, pH controlado y acabado duradero. Menos
			pasadas, más espejo en la pintura.
		</p>
	</div>
</section>

<footer
	class="flex items-center justify-between bg-[#14081f] px-6 py-6 text-[10px] tracking-[0.2em] text-violet-300/60 md:px-10"
>
	<span>AURA DETAIL</span>
	<a href="#catalogo" class="hover:text-white">SUBIR AL CATÁLOGO</a>
	<a href="/sign-in" class="hover:text-white">CUENTA</a>
</footer>
