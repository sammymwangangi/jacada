import Base from "@layouts/Baseof";
import Circle from "@layouts/components/Circle";
import Cta from "@layouts/components/Cta";
import ImageFallback from "@layouts/components/ImageFallback";
import VideoPopup from "@layouts/components/VideoPopup";
import { TagList, TagListItem } from '@layouts/components/TagList'
import { getListPage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { TbQuote } from "react-icons/tb";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { RadioGroup } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import config from "@config/config.json";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";


const frequencies = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually' },
]
const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '#contact-us',
    featured: false,
    description: 'All your essential cloud storage needs, taken care of.',
    price: { monthly: 'KSH.600', annually: 'KSH.6000' },
    mainFeatures: ['50 GB Cloud Storage', 'For your Devices'],
  },
  {
    name: 'Business Plan',
    id: 'tier-scale',
    href: '#contact-us',
    featured: true,
    description: 'The best cloud storage services for your thriving business.',
    price: { monthly: 'KSH. 1500', annually: 'KSH.15000' },
    mainFeatures: [
      '125 GB Cloud Storage',
      'For your Devices',
      'Mutli-accounts',
      'Tax planning toolkit',
      'VAT & VATMOSS filing',
      'Free bank transfers',
    ],
  },
  {
    name: 'Enterprise Plan',
    id: 'tier-growth',
    href: '#contact-us',
    featured: false,
    description: 'Convenient cloud storage to take your business to the next level.',
    price: { monthly: 'KSH.3000', annually: 'KSH.30000' },
    mainFeatures: ['250 GB Cloud Storage', 'For your Devices', 'Mutli-accounts', 'Tax planning toolkit'],
  },
]
const sections = [
  {
    name: 'Catered for business',
    features: [
      { name: 'Tax Savings', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Easy to use accounting', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Multi-accounts', tiers: { Starter: '3 accounts', Scale: 'Unlimited accounts', Growth: '7 accounts' } },
      { name: 'Invoicing', tiers: { Starter: '3 invoices', Scale: 'Unlimited invoices', Growth: '10 invoices' } },
      { name: 'Exclusive offers', tiers: { Starter: false, Scale: true, Growth: true } },
      { name: '6 months free advisor', tiers: { Starter: false, Scale: true, Growth: true } },
      { name: 'Mobile and web access', tiers: { Starter: false, Scale: true, Growth: false } },
    ],
  },
  {
    name: 'Other perks',
    features: [
      { name: '24/7 customer support', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Instant notifications', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Budgeting tools', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Digital receipts', tiers: { Starter: true, Scale: true, Growth: true } },
      { name: 'Pots to separate money', tiers: { Starter: false, Scale: true, Growth: true } },
      { name: 'Free bank transfers', tiers: { Starter: false, Scale: true, Growth: false } },
      { name: 'Business debit card', tiers: { Starter: false, Scale: true, Growth: false } },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Home = ({ banner, about, brands, features, intro, speciality, testimonial }) => {
  const paginationRef = useRef(null);
  const testimonialPaginationRef = useRef(null);
  const [frequency, setFrequency] = useState(frequencies[0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4"
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5"
        );

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: true,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base>
      <section className="section banner pt-0">
        <div className="container-xl">
          <div className="relative">
            <div className="bg-theme banner-bg col-12 absolute top-0 left-0">
              <Circle
                className="circle left-[10%] top-12"
                width={32}
                height={32}
                fill={false}
              />
              <Circle
                className="circle left-[2.5%] top-[29%]"
                width={85}
                height={85}
              />
              <Circle
                className="circle left-[22%] bottom-[48%]"
                width={20}
                height={20}
              />
              <Circle
                className="circle left-[15%] bottom-[37%]"
                width={47}
                height={47}
                fill={false}
              />
              <Circle
                className="circle left-[6%] bottom-[13%]"
                width={62}
                height={62}
                fill={false}
              />
              <Circle
                className="circle right-[12%] top-[15%]"
                width={20}
                height={20}
              />
              <Circle
                className="circle right-[2%] top-[30%]"
                width={73}
                height={73}
                fill={false}
              />
              <Circle
                className="circle right-[19%] top-[48%]"
                width={37}
                height={37}
                fill={false}
              />
              <Circle
                className="circle right-[33%] top-[54%]"
                width={20}
                height={20}
              />
              <Circle
                className="circle right-[3%] bottom-[20%]"
                width={65}
                height={65}
              />
            </div>
            <div className="row overflow-hidden rounded-2xl">
              <div className="col-12">
                <div className="row relative justify-center pb-10">
                  <div className="banner-content col-10 pt-20 pb-10 text-center">
                    {markdownify(
                      banner.title,
                      "h1",
                      "mb-8 banner-title opacity-0"
                    )}
                    <div className="banner-btn opacity-0">
                      <Link className="btn btn-primary" href={banner.link.href}>
                        {banner.link.label}
                      </Link>
                    </div>
                  </div>
                  <div className="col-10">
                    <ImageFallback
                      className="banner-img opacity-0"
                      src={banner.image}
                      width={1170}
                      height={666}
                      priority={true}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row border-y border-border py-5">
              <div className="animate from-right col-12">
                <Swiper
                  loop={true}
                  slidesPerView={3}
                  breakpoints={{
                    992: {
                      slidesPerView: 5,
                    },
                  }}
                  spaceBetween={20}
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000 }}
                >
                  {brands.map((brand, index) => (
                    <SwiperSlide
                      className=" h-20 cursor-pointer py-6 px-6 grayscale  transition hover:grayscale-0 lg:px-10"
                      key={"brand-" + index}
                    >
                      <div className="relative h-full">
                        <ImageFallback
                          className="object-contain"
                          src={brand}
                          sizes="100vw"
                          alt=""
                          fill={true}
                          priority={true}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* About */}
      <div id="about" className="section container">
          <div className="row items-center justify-center">
            <div className="animate md:col-6 lg:col-5 md:order-2">
              <div className="about-image relative p-[60px]">
                <ImageFallback
                  className="animate relative w-full rounded-2xl"
                  src="/images/about/about.jpg"
                  width={425}
                  height={487}
                  alt="about"
                />
                <Circle
                  className="top-4 left-4 z-[-1]"
                  width={85}
                  height={85}
                />
                <Circle
                  width={37}
                  height={37}
                  fill={false}
                  className="top-20 right-10 z-[-1]"
                />
                <Circle
                  className="top-1/2 right-12 -z-[1]"
                  width={24}
                  height={24}
                />
                <Circle
                  className="bottom-6 right-6 z-[-1]"
                  width={85}
                  height={85}
                />
                <Circle
                  className="top-1/2 left-12 z-[-1]"
                  width={20}
                  height={20}
                />
                <Circle
                  className="bottom-12 left-8 z-[1]"
                  width={47}
                  height={47}
                  fill={false}
                />
              </div>
            </div>
            <div className="animate md:col-6 lg:col-4 md:order-1">
              <p>WHO WE ARE</p>
              
              <h2 className="section-title bar-left mt-4">Hello, We’re Jacada Here For Your Help</h2>
              <p className="mt-10">Jacada Technology Limited was founded as a result of the ever-increasing need of real-time, accessible, efficiency, fast and accurate technology solutions that are tailor made to complement the business processes at work place. With this we have embarked on a journey to become a both SaaS and on premises solution provider, to achieve this we have strategically partnered with like-minded organization to provide the best solutions in the region and beyond.</p>
            </div>
          </div>
        </div>


      {/* Features */}
      <section className="section">
        <div className="container text-center">
          <div className="animate">
            {/* <p className="uppercase">{features.sub_title}</p> */}
            {markdownify(features.title, "h2", "mt-4 section-title")}
            {markdownify(features.description, "p", "mt-10")}
          </div>
          <div className="animate from-right relative mt-10">
            <Swiper
              slidesPerView={1}
              pagination={{
                type: "bullets",
                el: paginationRef.current,
                clickable: true,
                dynamicBullets: true,
              }}
              // autoplay={{ delay: 3000 }}
              onBeforeInit={(swiper) => {
                swiper.params.pagination.el = paginationRef.current;
              }}
              modules={[Pagination]}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {features.list.map((item, index) => (
                <SwiperSlide key={"feature-" + index}>
                  <div className="feature-card m-4 rounded-md border border-transparent py-16 px-7 shadow-[0px_4px_25px_rgba(0,0,0,.05)] transition-all duration-300  hover:border-[#ffece4] hover:shadow-none">
                    <div className="feature-card-icon inline-flex h-20 w-20 items-center justify-center rounded-md border border-[#fff7f3] text-primary">
                      <FeatherIcon icon={item.icon} />
                    </div>
                    <h3 className="h4 mt-6 mb-5">{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="relative mt-9 flex justify-center">
              <div className="pagination " ref={paginationRef}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Short Into */}
      <section className="section pt-0">
        <div className="container-xl">
          <div className="relative px-4 py-[70px]">
            <div className="text-center">
              <div className="animate">
                <p>{intro.subtitle}</p>
                {markdownify(intro.title, "h2", "mt-4 section-title")}
                {markdownify(intro.description, "p", "mt-10")}
              </div>
              <div className="mx-auto mt-10 h-full max-h-[394px] w-full max-w-[716px]">
                {/* <VideoPopup id="cK-5sf_n204" thumbnail={intro.thumbnail} /> */}
                <LiteYouTubeEmbed id="cc4IxEprSU8" />
              </div>
            </div>
            <div className="bg-theme absolute top-0 left-0 w-full">
              <Circle
                className="left-[10%] top-12"
                width={32}
                height={32}
                fill={false}
              />
              <Circle className="left-[3%] top-[30%]" width={85} height={85} />
              <Circle
                className="left-[22%] bottom-[52%]"
                width={20}
                height={20}
              />
              <Circle
                className="left-[15%] bottom-[35%]"
                width={47}
                height={47}
                fill={false}
              />
              <Circle
                className="left-[6%] bottom-[6%]"
                width={62}
                height={62}
                fill={false}
              />
              <Circle
                className="right-[12%] top-[12%]"
                width={20}
                height={20}
              />
              <Circle
                className="right-[2%] top-[30%]"
                width={73}
                height={73}
                fill={false}
              />
              <Circle
                className="right-[19%] top-[50%]"
                width={37}
                height={37}
                fill={false}
              />
              <Circle
                className="right-[33%] top-[52%]"
                width={20}
                height={20}
              />
              <Circle
                className="right-[5%] bottom-[18%]"
                width={65}
                height={65}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section id="services" className="section">
        <div className="container">
          <div className="row items-center justify-center">
            <div className="animate lg:col-6 lg:order-2">
              <ImageFallback
                className="mx-auto"
                src={speciality.primary.image}
                width={575}
                height={511}
                alt="primary speciality"
              />
            </div>
            <div className="animate lg:col-5 lg:order-1">
              <p>{speciality.primary.subtitle}</p>
              {markdownify(
                speciality.primary.title,
                "h2",
                "mt-4 section-title bar-left"
              )}
              {markdownify(speciality.primary.description, "p", "mt-10")}
            </div>
          </div>
          <div className="row items-center">
            <div className="animate lg:col-6">
              <ImageFallback
                className="mx-auto"
                src={speciality.secondary.image}
                width={575}
                height={511}
                alt="secondary speciality"
              />
            </div>
            <div className="animate lg:col-5">
              <p>{speciality.secondary.subtitle}</p>
              {markdownify(
                speciality.secondary.title,
                "h2",
                "mt-4 section-title bar-left"
              )}
              {markdownify(speciality.secondary.description, "p", "mt-10")}
            </div>
          </div>
          <div className="row items-center justify-center">
            <div className="animate lg:col-6 lg:order-2">
              <ImageFallback
                className="mx-auto"
                src={speciality.primary2.image}
                width={575}
                height={511}
                alt="primary2 speciality"
              />
            </div>
            <div className="animate lg:col-5 lg:order-1">
              <p>{speciality.primary2.subtitle}</p>
              {markdownify(
                speciality.primary2.title,
                "h2",
                "mt-4 section-title bar-left"
              )}
              {markdownify(speciality.primary2.description, "p", "mt-10")}
            </div>
          </div>
          
          <div className="row items-center">
            <div className="animate lg:col-6">
              <ImageFallback
                className="mx-auto"
                src={speciality.secondary2.image}
                width={575}
                height={511}
                alt="secondary2 speciality"
              />
            </div>
            <div className="animate lg:col-5">
              <p>{speciality.secondary2.subtitle}</p>
              {markdownify(
                speciality.secondary2.title,
                "h2",
                "mt-4 section-title bar-left"
              )}
              {markdownify(speciality.secondary2.description, "p", "mt-10")}
            </div>
          </div>
          <div className="row items-center justify-center">
            <div className="animate lg:col-6 lg:order-2">
              <ImageFallback
                className="mx-auto"
                src={speciality.secondary3.image}
                width={575}
                height={511}
                alt="secondary3 speciality"
              />
            </div>
            <div className="animate lg:col-5 lg:order-1">
              <p>{speciality.secondary3.subtitle}</p>
              {markdownify(
                speciality.secondary3.title,
                "h2",
                "mt-4 section-title bar-left"
              )}
              {markdownify(speciality.secondary3.description, "p", "mt-10")}
            </div>
          </div>
        </div>
      </section>

      <section className="section container-xl relative">
        <div className="bg-theme absolute top-0 left-0 w-full">
          <Circle
            className="left-[7%] top-[21%]"
            width={32}
            height={32}
            fill={false}
          />
          <Circle
            className="left-[30%] top-[10%]"
            width={20}
            height={20}
            fill={false}
          />
          <Circle
            className="left-[4%] bottom-[35%]"
            width={20}
            height={20}
            fill={false}
          />
          <Circle
            className="left-[10%] bottom-[11%]"
            width={37}
            height={37}
            fill={false}
          />
          <Circle
            className="left-[44%] bottom-[48%]"
            width={37}
            height={37}
            fill={false}
          />
          <Circle
            className="left-[35%] bottom-[22%]"
            width={20}
            height={20}
            fill={false}
          />
          <Circle
            className="right-[32%] top-[2%]"
            width={47}
            height={47}
            fill={false}
          />
        </div>
        <div className="row items-center justify-center py-[90px]">
          <div className="md:col-6 xl:col-4">
            <div className="animate p-5">
              <p>CUSTOMER SERVICES</p>
              <h2 className="mt-4 section-title bar-left">CUSTOMER SERVICES</h2>
              <p className="mt-10">
                Your customers and employees want to talk to you—make it easy for them. Our support products are flexible and empower you to assist people when they need you most. Conversations flow seamlessly across all channels, leading to greater productivity and satisfaction all around.
              </p>

              <TagList className="mt-4">
                <TagListItem>HELP DESK-TICKETING</TagListItem>
                <TagListItem>CALL CENTER</TagListItem>
                <TagListItem>LIVE CHATS</TagListItem>
                <TagListItem>WHATSAPP INTEGRATIONS</TagListItem>
                <TagListItem>IT CONSULTANCY</TagListItem>
              </TagList>

            </div>
          </div>
          <div className="md:col-6 xl:col-5">
            <div className="px-4 ">
              {/* <VideoPopup
                  id={video.video_id}
                  thumbnail={video.thumbnail}
                  width={540}
                  height={585}
                /> */}
              <ImageFallback
                className="animate relative w-full rounded-2xl"
                src="/images/services/customer-service.png"
                width={425}
                height={487}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section pt-0 mt-10">
        <div className="container">
          <div className="animate text-center">
            <p>{testimonial.subtitle}</p>
            {markdownify(testimonial.title, "h2", "mt-4 section-title")}
            {markdownify(testimonial.description, "p", "mt-10")}
          </div>
          <div className="animate row mt-10 items-center justify-center">
            <div className="xl:col-11">
              <div className="row items-center justify-center">
                <div className="hidden lg:col-3 xl:col-4 lg:block">
                  <ImageFallback
                    src="/images/testimonials-01.png"
                    width={455}
                    height={522}
                    alt="testimonials"
                  />
                </div>
                <div className="md:col-7 lg:col-6 xl:col-4">
                  {
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      pagination={{
                        el: testimonialPaginationRef.current,
                        type: "bullets",
                        dynamicBullets: true,
                        clickable: true,
                      }}
                      autoplay={{ delay: 3000 }}
                      onBeforeInit={(swiper) => {
                        swiper.params.pagination.el =
                          testimonialPaginationRef.current;
                      }}
                      className="testimonial-slider mx-auto max-w-[420px] cursor-pointer lg:max-w-[480px]"
                    >
                      {testimonial.list.map((item, index) => (
                        <SwiperSlide
                          className="text-center"
                          key={"testimonial-" + index}
                        >
                          <div className="py-6 px-8 sm:py-12 md:px-10 lg:px-20 xl:px-12">
                            <TbQuote className="mx-auto rotate-180 text-5xl text-body sm:text-6xl lg:text-8xl" />
                            {markdownify(
                              item.content,
                              "p",
                              "text-[17px] lg:text-lg text-body mt-4 md:mt-5 xl:mt-8"
                            )}
                            <div className="mt-7 inline-block rounded-md bg-body p-7 shadow-[0_10px_50px_rgba(0,0,0,.08)] md:mt-5 lg:mt-8 xl:mt-5">
                              <ImageFallback
                                className="mx-auto rounded-full"
                                src={item.avatar}
                                width={90}
                                height={90}
                                priority={true}
                                alt={item.author}
                              />
                              <h6>{item.author}</h6>
                              <p>{item.profession}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  }
                  <div className="relative h-8">
                    <div
                      className="pagination absolute left-1/2 -translate-x-1/2"
                      ref={testimonialPaginationRef}
                    ></div>
                  </div>
                </div>
                <div className="hidden lg:col-3 xl:col-4 lg:block">
                  <ImageFallback
                    src="/images/testimonials-02.png"
                    width={455}
                    height={522}
                    alt="testimonials"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="isolate overflow-hidden">
        <div className="flow-root bg-gray-900 pb-16 pt-24 sm:pt-32 lg:pb-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative z-10">
              <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
              Our Pricing Plan
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
              Get Started with storage plans in Kenya with the starter package from Ksh. 600 per month (50 GB Storage).
              </p>
              <div className="mt-16 flex justify-center">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
                >
                  <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
                  {frequencies.map((option) => (
                    <RadioGroup.Option
                      key={option.value}
                      value={option}
                      className={({ checked }) =>
                        classNames(checked ? 'bg-[#a7bd63]' : '', 'cursor-pointer rounded-full px-2.5 py-1')
                      }
                    >
                      <span>{option.label}</span>
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
              <svg
                viewBox="0 0 1208 1024"
                aria-hidden="true"
                className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
              >
                <ellipse cx={604} cy={512} fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" rx={604} ry={512} />
                <defs>
                  <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#a7bd63" />
                  </radialGradient>
                </defs>
              </svg>
              <div
                className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                aria-hidden="true"
              />
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
                      : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                    'relative rounded-2xl'
                  )}
                >
                  <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.featured ? 'text-gray-900' : 'text-white',
                        'text-sm font-semibold leading-6'
                      )}
                    >
                      {tier.name}
                    </h3>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                      <div className="mt-2 flex items-center gap-x-4">
                        <p
                          className={classNames(
                            tier.featured ? 'text-gray-900' : 'text-white',
                            'text-4xl font-bold tracking-tight'
                          )}
                        >
                          {tier.price[frequency.value]}
                        </p>
                        <div className="text-sm leading-5">
                          <p className={tier.featured ? 'text-gray-900' : 'text-white'}>KES</p>
                          <p
                            className={tier.featured ? 'text-gray-500' : 'text-gray-400'}
                          >{`Billed ${frequency.value}`}</p>
                        </div>
                      </div>
                      <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className={classNames(
                          tier.featured
                            ? 'bg-[#a7bd63] shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                            : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                          'rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                        )}
                      >
                        Buy this plan
                      </a>
                    </div>
                    <div className="mt-8 flow-root sm:mt-10">
                      <ul
                        role="list"
                        className={classNames(
                          tier.featured
                            ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                            : 'divide-white/5 border-white/5 text-white',
                          '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0'
                        )}
                      >
                        {tier.mainFeatures.map((mainFeature) => (
                          <li key={mainFeature} className="flex gap-x-3 py-2">
                            <CheckIcon
                              className={classNames(
                                tier.featured ? 'text-indigo-600' : 'text-gray-500',
                                'h-6 w-5 flex-none'
                              )}
                              aria-hidden="true"
                            />
                            {mainFeature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative bg-white lg:pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact-us" className="section pt-0">
        <div className="container-xl">
          <div className="relative px-4 py-[70px]">
            <div className="text-center">
              <div className="animate">
                <h2 className="mt-4 section-title">Let’s work together</h2>
                <p className="mt-10">We can’t wait to hear from you.</p>
              </div>
              <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              method="POST"
              action={config.params.contact_form_action}
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            >
              <h2 className="h4 mb-6">Send A Message</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea className="form-textarea w-full" rows="6" />
              </div>
              <button className="btn btn-primary block w-full">
                Submit Now
              </button>
            </form>
          </div>
        </div>
            </div>
            <div className="bg-theme absolute top-0 left-0 w-full">
              <Circle
                className="left-[10%] top-12"
                width={32}
                height={32}
                fill={false}
              />
              <Circle className="left-[3%] top-[30%]" width={85} height={85} />
              <Circle
                className="left-[22%] bottom-[52%]"
                width={20}
                height={20}
              />
              <Circle
                className="left-[15%] bottom-[35%]"
                width={47}
                height={47}
                fill={false}
              />
              <Circle
                className="left-[6%] bottom-[6%]"
                width={62}
                height={62}
                fill={false}
              />
              <Circle
                className="right-[12%] top-[12%]"
                width={20}
                height={20}
              />
              <Circle
                className="right-[2%] top-[30%]"
                width={73}
                height={73}
                fill={false}
              />
              <Circle
                className="right-[19%] top-[50%]"
                width={37}
                height={37}
                fill={false}
              />
              <Circle
                className="right-[33%] top-[52%]"
                width={20}
                height={20}
              />
              <Circle
                className="right-[5%] bottom-[18%]"
                width={65}
                height={65}
              />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, brands, features, intro, speciality, testimonial } =
    frontmatter;

  return {
    props: {
      banner: banner,
      brands: brands,
      features: features,
      intro: intro,
      speciality: speciality,
      testimonial: testimonial,
    },
  };
};
