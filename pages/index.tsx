import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";


interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = ({}) => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { data: reviews, error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.65,
      inertia: 0.3,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor!.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    console.clear();
    console.log.apply(console, [
      "%c Designed and Developed by Adeola Adeoti %c %c🚀 %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c Thanks for stopping by, I’m currently looking to a new team of creative designers and developers.\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
    ]);
  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="https://bao.red/" rel="canonical" />
          <meta name="theme-color" content="#0098EF" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>BaoChn Studio &mdash; Create Possibility</title>
          <meta
            name="description"
            content="Chasing dreams without stopping, Creative ideas can be expected!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="BaoChn Studio &mdash; Create Possibility"
          />
          <meta property="og:url" content="https://bao.red/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="Chasing dreams without stopping, Creative ideas can be expected!"
          />
          <meta
            name="twitter:title"
            content="BaoChn Studio &mdash; Create Possibility"
          />
          <meta
            name="twitter:description"
            content="Chasing dreams without stopping, Creative ideas can be expected!"
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://bao.red/" />
        </Head>
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio>
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <img src="svg/iCool.svg" alt="BOCO-icon" />
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">After_Effect</p>
              <p className="preloader__text">Illustrator</p>
              <p className="preloader__text">Photoshop</p>
              <p className="preloader__text">Office</p>
              <p className="preloader__text">HTML</p>
            </motion.div>
          </div>
        </motion.div>
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                <span>Keep Chasing dreams,</span> <br />
                <span className="header__hero--heading-gradient">
                  Creative{" "}
                </span> 
                <span>ideas</span>
                <br />
                <span>Come true!</span>
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                EXPLORE MORE
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a target="_blank" href="https://a-b.cc/QQ" rel="noopener">
                🐧 QQ
              </a>
              <a target="_blank" href="https://t.me/BaoChn" rel="noopener">
                🛩️ TG
              </a>
              <a target="_blank" href="https://a-b.cc/WC" rel="noopener">
                👁️‍🗨️ WC
              </a>
              <a target="_blank" href="https://github.com/BaoChn" rel="noopener">
                {" "}
                👾 GH
              </a>
              </div>
          </div>
        </div>
        <main className="container">
          <p className="about-text">
            A adulthood man which nearly graduate🎓, I'm willing<br />
            to provide any assist if it's needed for you guys~
          </p>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>猜猜我是谁</span> <small>❔</small>
            </h1>
            <p className="paragraph">
              🧑‍🎓一只大四预备毕业生 🛠️数字达人，扎实技能<br />
              🚀兴趣不详，爱好多样 🛸乐于探索，脑洞辽阔
            </p>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  AFTER EFFECT, BLENDER, TBH
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/alexxandria-1.webp" alt="alexxandria model" />
                <img src="webp/alexxandria-2.webp" alt="alexxandria logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  Video Maker
                  <br /> 影视创作
                </h2>
                <a
                rel="noopener"
                  target="_blank"
                  href="https://a-b.cc/🎬/"
                  className="project-card__link"
                >
                  HAVE A LOOK
                </a>
                <div className="project-card__socials">
                  <a href="#">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                  rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">HTML5, FIGMA, XD</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/pixelchef-1.webp" alt="pixelchef" />
                <img src="webp/pixelchef-2.webp" alt="pixelchef logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="pixelchef-anim"
                  className="heading-2"
                >
                  UI/UX Design
                  <br /> 交互设计
                </h2>
                <a
                rel="noopener"
                  target="_blank"
                  href="https://fxhub.cn/Document｜文档模板/Web_design_for_Tesla.pdf"
                  className="project-card__link"
                >
                  CHECK MY WORK
                </a>
                <div className="project-card__socials">
                  <a href="#">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                  rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  ILLUSTRATOR, PHOTOSHOP, CAD
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/heatrow-1.webp" alt="heatrow" />
                <img src="webp/heatrow-2.webp" alt="heatrow logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  Graphic Design
                  <br /> 图像绘制
                </h2>
                <a
                  href="https://a-b.cc/🎨/"
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  GET MY IDEA
                </a>
                <div className="project-card__socials">
                  <a href="https://dribbble.com/BaoChn">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                  rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">OFFIACCOUNT, TIKTOK, BLOG</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/adeola-1.webp" alt="adeola model" />
                <img src="webp/adeola-2.webp" alt="adeola logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  Platform Operation
                  <br /> 平台运营
                </h2>
                <a
                rel="noopener"
                  target="_blank"
                  href="https://a-b.cc/wp-content/uploads/QRmini.png"
                  className="project-card__link"
                >
                  FOLLOW THE ACCOUNT
                </a>
                <div className="project-card__socials">
                  <a
                  rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                  rel="noopener"
                    target="_blank"
                    href="https://github.com/BaoChn"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>How do everyone comment! </span> <small>💬</small>
              </h1>
              <p className="paragraph paragraph__sub">
                瞧瞧大伙对咱的评价
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper review-card__anim1">
                {reviews?.data.map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="svg/twitter.svg" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper review-card__anim2">
                {reviews?.data.sort().map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="svg/twitter.svg" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>That's all? </span> <small>🤔</small>
            </h1>
            <h2 className="section-contact__h2">
              更多创意，未完待续…
              <a href="tel:+8613914046229"> call 🇨🇳 &nbsp;</a>
              or 
              <a
                href="mailto:0246@88.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; send 📧
              </a>
              .
            </h2>
          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Keeping Connetion!</span> <small>👋</small>
            </h1>
            <p className="paragraph">有问题？常联系！</p>
            <div className="section-socials--links">
              <a target="_blank" href="https://a-b.cc/QQ" rel="noopener">
                🐧 QQ
              </a>
              <a target="_blank" href="https://t.me/BaoChn" rel="noopener">
                🛩️ TG
              </a>
              <a target="_blank" href="https://a-b.cc/WC" rel="noopener">
                👁️‍🗨️ WC
              </a>
              <a target="_blank" href="https://github.com/BaoChn" rel="noopener">
                👾 GH
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <img
            src="svg/BeCool.svg"
            alt="design and devloped by BaoChn"
          />
          <div className="footer__socials">
            <a
              href="https://dribbble.com/BaoChn"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/dribble.svg" alt="dribble logo" />
            </a>
            <a
              href="https://github.com/BaoChn"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
