import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flower2,
  Heart,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import hero from "../assets/hero.png";

const petals = [
  { left: "7%", top: "18%", delay: 0, duration: 9 },
  { left: "18%", top: "72%", delay: 2, duration: 11 },
  { left: "42%", top: "15%", delay: 1, duration: 10 },
  { left: "72%", top: "22%", delay: 3, duration: 12 },
  { left: "88%", top: "65%", delay: 1, duration: 9 },
];

const occasions = [
  {
    title: "Romance",
    subtitle: "Say it with flowers",
    image: hero,
    link: "/products?category=roses",
  },
  {
    title: "Celebrations",
    subtitle: "Make moments brighter",
    image: hero,
    link: "/products?category=bouquets",
  },
  {
    title: "Birthdays",
    subtitle: "Add colour to their day",
    image: hero,
    link: "/products?category=birthday",
  },
  {
    title: "Weddings",
    subtitle: "Beautifully unforgettable",
    image: hero,
    link: "/products?category=wedding",
  },
];

const products = [
  {
    name: "The Rose Affair",
    type: "Premium Bouquet",
    price: "₹799",
    image: hero,
  },
  {
    name: "Blush Garden",
    type: "Mixed Flowers",
    price: "₹1,099",
    image: hero,
  },
  {
    name: "Forever Bloom",
    type: "Luxury Arrangement",
    price: "₹1,499",
    image: hero,
  },
];

const services = [
  {
    icon: Flower2,
    title: "Custom Arrangements",
    description:
      "Tell us your vision and we will create a floral arrangement around it.",
  },
  {
    icon: Sparkles,
    title: "Event Decoration",
    description:
      "Transform weddings, celebrations and special events with beautiful floral styling.",
  },
  {
    icon: Truck,
    title: "Fresh Doorstep Delivery",
    description:
      "Carefully prepared flowers delivered fresh to your chosen location.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  return (
    <main className="overflow-hidden bg-[#fffbf7] text-stone-800">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#f9e8ed]">

        {/* soft background shapes */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#f4cbd7]/50 blur-3xl" />
        <div className="absolute -bottom-40 right-[-100px] h-[500px] w-[500px] rounded-full bg-[#dce6d6]/50 blur-3xl" />

        {/* floating flowers */}
        {petals.map((petal, index) => (
          <motion.div
            key={index}
            className="pointer-events-none absolute text-2xl opacity-30 md:text-4xl"
            style={{
              left: petal.left,
              top: petal.top,
            }}
            animate={{
              y: [0, -25, 10, 0],
              x: [0, 12, -8, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✿
          </motion.div>
        ))}

        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#9f1239]"
            >
              <span className="h-px w-10 bg-[#9f1239]" />
              Floral Studio
            </motion.div>

            <h1 className="max-w-2xl font-serif text-6xl font-medium leading-[0.95] tracking-tight text-[#292524] sm:text-7xl lg:text-[88px]">
              Flowers
              <br />
              <span className="italic text-[#9f1239]">
                that speak
              </span>
              <br />
              for you.
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-stone-600">
              Thoughtfully designed bouquets, beautiful floral arrangements
              and memorable decorations for life's most beautiful moments.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/products"
                className="group flex items-center gap-3 rounded-full bg-[#9f1239] px-7 py-4 font-medium text-white shadow-lg shadow-[#9f1239]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#881337]"
              >
                Explore Flowers
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/services"
                className="flex items-center gap-2 rounded-full border border-[#9f1239]/25 bg-white/50 px-7 py-4 font-medium text-[#9f1239] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Our Services
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-stone-600">
              <span className="flex items-center gap-2">
                <Flower2 size={17} />
                Fresh Flowers
              </span>

              <span className="flex items-center gap-2">
                <Truck size={17} />
                Fast Delivery
              </span>

              <span className="flex items-center gap-2">
                <Heart size={17} />
                Made With Care
              </span>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 35 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-white/30 blur-2xl" />

            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[3rem] shadow-2xl"
            >
              <img
                src={hero}
                alt="Beautiful floral arrangement"
                className="h-[560px] w-full object-cover lg:h-[650px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            {/* floating card */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-7 left-5 rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md md:-left-7"
            >
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Crafted with care
              </p>

              <p className="mt-1 font-serif text-lg text-stone-800">
                Every bouquet tells a story.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ================= INTRO ================= */}
      <section className="px-6 py-24 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">

            <Flower2
              className="mx-auto mb-7 text-[#9f1239]"
              size={34}
              strokeWidth={1.4}
            />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9f1239]">
              More than just flowers
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-stone-800 md:text-6xl">
              We turn ordinary moments into
              <span className="italic text-[#9f1239]">
                {" "}beautiful memories.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-500">
              Whether it is a quiet gesture of love or a celebration filled
              with people, our flowers are designed to make the moment feel
              special.
            </p>

          </div>
        </Reveal>
      </section>


      {/* ================= OCCASIONS ================= */}
      <section className="bg-[#f4f1eb] px-6 py-24 md:py-28">

        <Reveal>
          <div className="mx-auto mb-14 max-w-7xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9f1239]">
              Find your flowers
            </p>

            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-6xl">
                Flowers for every
                <span className="italic text-[#9f1239]">
                  {" "}occasion.
                </span>
              </h2>

              <Link
                to="/products"
                className="group flex items-center gap-2 font-medium text-[#9f1239]"
              >
                View collection
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>
          </div>
        </Reveal>


        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {occasions.map((occasion, index) => (
            <Reveal key={occasion.title} delay={index * 0.08}>

              <Link
                to={occasion.link}
                className="group relative block overflow-hidden rounded-[2rem]"
              >

                <div className="relative h-[430px] overflow-hidden">

                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                    <p className="mb-2 text-sm text-white/75">
                      {occasion.subtitle}
                    </p>

                    <h3 className="font-serif text-3xl">
                      {occasion.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-sm opacity-0 transition duration-300 group-hover:opacity-100">
                      Explore
                      <ArrowRight size={16} />
                    </div>

                  </div>

                </div>

              </Link>

            </Reveal>
          ))}

        </div>
      </section>


      {/* ================= FEATURED COLLECTION ================= */}
      <section className="px-6 py-24 md:py-32">

        <Reveal>
          <div className="mx-auto mb-14 max-w-7xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9f1239]">
              Curated collection
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Our favourites
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-stone-500">
              Beautiful arrangements designed to make an impression.
            </p>

          </div>
        </Reveal>


        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">

          {products.map((product, index) => (
            <Reveal key={product.name} delay={index * 0.1}>

              <Link
                to="/products"
                className="group block"
              >

                <div className="relative overflow-hidden rounded-[2rem] bg-[#f3ede7]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[430px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#9f1239] backdrop-blur">
                    {product.price}
                  </div>

                </div>

                <div className="px-2 pt-5">

                  <p className="text-sm text-stone-500">
                    {product.type}
                  </p>

                  <div className="mt-1 flex items-center justify-between">

                    <h3 className="font-serif text-2xl text-stone-800">
                      {product.name}
                    </h3>

                    <ArrowRight
                      size={20}
                      className="text-[#9f1239] transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </div>

                </div>

              </Link>

            </Reveal>
          ))}

        </div>

        <Reveal>
          <div className="mt-14 text-center">

            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full border border-stone-300 px-7 py-3.5 font-medium transition duration-300 hover:border-[#9f1239] hover:bg-[#9f1239] hover:text-white"
            >
              Explore Full Collection
              <ArrowRight size={17} />
            </Link>

          </div>
        </Reveal>

      </section>


      {/* ================= LARGE STORY SECTION ================= */}
      <section className="px-6 py-10 md:py-16">

        <Reveal>

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#7b2438]">

            <div className="grid items-center md:grid-cols-2">

              <div className="p-10 text-white md:p-16 lg:p-20">

                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f8cbd7]">
                  Made for your moment
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                  Your occasion.
                  <br />
                  Your flowers.
                  <br />
                  <span className="italic text-[#f8cbd7]">
                    Your story.
                  </span>
                </h2>

                <p className="mt-7 max-w-lg leading-8 text-white/75">
                  From intimate celebrations to grand events, we create
                  floral experiences that match the feeling you want to
                  create.
                </p>

                <Link
                  to="/services"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-medium text-[#7b2438] transition duration-300 hover:-translate-y-1"
                >
                  Explore our services
                  <ArrowRight size={17} />
                </Link>

              </div>


              <div className="relative h-[430px] md:h-[620px]">

                <img
                  src={hero}
                  alt="Floral event arrangement"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#7b2438] via-transparent to-transparent md:bg-gradient-to-r" />

              </div>

            </div>

          </div>

        </Reveal>

      </section>


      {/* ================= SERVICES ================= */}
      <section className="px-6 py-24 md:py-32">

        <Reveal>
          <div className="mx-auto mb-14 max-w-7xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9f1239]">
              What we offer
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-6xl">
              Everything you need to
              <span className="italic text-[#9f1239]">
                {" "}make it special.
              </span>
            </h2>

          </div>
        </Reveal>


        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.1}>

                <div className="group rounded-[2rem] border border-stone-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d9a4b2] hover:shadow-xl md:p-10">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9e8ed] text-[#9f1239] transition duration-300 group-hover:scale-110">

                    <Icon size={25} strokeWidth={1.6} />

                  </div>

                  <h3 className="mt-7 font-serif text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-stone-500">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#9f1239]"
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </Reveal>
            );
          })}

        </div>

      </section>


      {/* ================= WHY US ================= */}
      <section className="bg-[#edf1e9] px-6 py-24 md:py-28">

        <Reveal>

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 md:grid-cols-2 md:items-center">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#64745f]">
                  Why choose us
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                  Freshness you can
                  <span className="italic text-[#64745f]">
                    {" "}feel.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
                  We believe beautiful flowers should arrive looking just as
                  beautiful as they did when they left our hands.
                </p>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-3xl bg-white p-7">
                  <Flower2
                    className="text-[#64745f]"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 font-semibold">
                    Fresh Selection
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Carefully selected flowers for every order.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7">
                  <Truck
                    className="text-[#64745f]"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 font-semibold">
                    Reliable Delivery
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Timely delivery to make every occasion count.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7">
                  <ShieldCheck
                    className="text-[#64745f]"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 font-semibold">
                    Secure Checkout
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Simple and secure ordering experience.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-7">
                  <Heart
                    className="text-[#64745f]"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-5 font-semibold">
                    Made With Care
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Every arrangement prepared with attention to detail.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </Reveal>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-[#9f1239] px-6 py-28 text-center text-white">

        <div className="pointer-events-none absolute -left-10 top-10 text-[160px] font-serif opacity-10">
          ✿
        </div>

        <div className="pointer-events-none absolute -right-10 bottom-0 text-[180px] font-serif opacity-10">
          ✿
        </div>

        <Reveal>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f8cbd7]">
            Let flowers do the talking
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">
            Make someone's day
            <span className="italic text-[#f8cbd7]">
              {" "}bloom.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/75">
            Find a bouquet, plan a celebration or create something completely
            your own.
          </p>

          <Link
            to="/products"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#9f1239] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#fff7fa]"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>

        </Reveal>

      </section>

    </main>
  );
}

export default Home;

