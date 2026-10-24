export default function Hero() {
  return (
    <section className="hero dk" id="home">
      <div className="wrap heroin">
        <div className="grid2">
          <div>
            <h1>Your Business. Built to Grow. <span className="acc">Made to Stand Out.</span></h1>
            <p className="sub">We help businesses grow through strategic digital marketing, creative content, high-performing websites, e-commerce solutions, and custom applications.</p>
            <div className="go heroctas">
              <a className="gbtn lg" href="#contact">Let’s Talk</a>
              <a className="gbtn ghost" href="#services">Explore Our Services</a>
            </div>
          </div>
          <div className="right">
            <p className="tag">Everything your business needs to grow <span className="acc">digitally.</span></p>
            <p className="cap">From building your online presence to reaching the right audience and developing digital products, we bring marketing, creativity, and technology together to move your business forward.</p>
            <div className="badges"><span className="chip">Marketing · Creative · Technology</span><span className="chip">Built for Growing Businesses</span></div>
            <ul className="svclabels" aria-label="Services">
              {['Digital Marketing', 'Meta Ads', 'Content Creation', 'Video Editing', 'Web Development', 'E-commerce', 'Web & App Development.'].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
