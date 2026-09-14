import MerchantForm from "@/components/MerchantForm";
import HostForm from "@/components/HostForm";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        <section className="hero container">
          <div className="heroCopy">
            <div className="eyebrow">LIVE COMMERCE, BUILT FOR EUROPE</div>

            <h1>
              Turn products into <span>live sales.</span>
            </h1>

            <p className="heroLede">
              We help brands turn livestreams into a measurable sales channel with
              trained hosts, compelling product demos and end-to-end live-commerce
              operations.
            </p>

            <div className="heroActions">
              <a className="btn btnPrimary" href="#apply">
                Sell with us
              </a>

              <a className="btn btnSecondary" href="#hosts">
                Become a host
              </a>
            </div>

            <div className="proofRow">
              <div>
                <strong>No influencer team</strong>
                <span>required</span>
              </div>

              <div>
                <strong>Performance-led</strong>
                <span>approach</span>
              </div>

              <div>
                <strong>Built to scale</strong>
                <span>across markets</span>
              </div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="liveCard">
              <div className="liveTopbar">
                <span className="livePill">● LIVE</span>
                <span>2.8K watching</span>
              </div>

              <div className="hostFrame">
                <div className="hostGlow" />
                <div className="hostAvatar">LS</div>

                <div className="floatingComment c1">
                  Does it work on dry skin?
                </div>

                <div className="floatingComment c2">
                  Just ordered ✨
                </div>

                <div className="floatingComment c3">
                  Show us the texture!
                </div>
              </div>

              <div className="productStrip">
                <div className="productThumb">01</div>

                <div className="productMeta">
                  <strong>Hydrating Serum</strong>
                  <span>€29.90 · Free shipping today</span>
                </div>

                <button type="button">Buy</button>
              </div>
            </div>

            <div className="metricCard metricA">
              <span>LIVE GMV</span>
              <strong>€8,420</strong>
              <small>+38% vs. last session</small>
            </div>

            <div className="metricCard metricB">
              <span>CONVERSION</span>
              <strong>3.7%</strong>
              <small>Best host-product match</small>
            </div>
          </div>
        </section>

        <section className="categoryStrip container">
          <p>Built for products people need to see in action</p>

          <div className="categoryTags">
            <span>Beauty</span>
            <span>Home</span>
            <span>Fashion</span>
            <span>Wellness</span>
            <span>Gadgets</span>
            <span>Pet</span>
          </div>
        </section>

        <section className="section container" id="how">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h2>
                A new sales channel.
                <br />
                Without building a new team.
              </h2>
            </div>

            <p>
              You bring the product. We build the live-commerce engine around it:
              the host, the sales angle, the content and the optimization loop.
            </p>
          </div>

          <div className="stepsGrid">
            {[
              [
                "01",
                "Submit your product",
                "Tell us what you sell, your target markets, pricing and available stock."
              ],
              [
                "02",
                "We build the strategy",
                "We match the right host, product angle, offer and livestream format."
              ],
              [
                "03",
                "We go live",
                "Trained hosts demonstrate, answer questions and sell in real time."
              ],
              [
                "04",
                "We optimize & scale",
                "We measure views, clicks, conversion, GMV and revenue per session."
              ]
            ].map(([number, title, copy]) => (
              <article className="stepCard" key={number}>
                <span className="stepNumber">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section splitPanel container" id="brands">
          <div className="panelCopy">
            <div className="eyebrow">FOR BRANDS</div>

            <h2>
              Not influencer marketing.
              <br />
              Commerce.
            </h2>

            <p>
              Traditional campaigns often stop at reach. We focus on the full path
              from attention to checkout and measure what actually produces sales.
            </p>

            <div className="compare">
              <div className="compareRow muted">
                <span>TRADITIONAL</span>
                <strong>Brand → Creator → Post → Views → ?</strong>
              </div>

              <div className="compareRow active">
                <span>LIVE COMMERCE</span>
                <strong>Brand → Host → Demo → Buyer → Order</strong>
              </div>
            </div>

            <a className="textLink" href="#apply">
              Submit a product →
            </a>
          </div>

          <div className="dataCard">
            <div className="dataHead">
              <span>LIVE PERFORMANCE</span>
              <span>● Live</span>
            </div>

            <div className="bigNumber">
              <small>Gross merchandise value</small>
              <strong>€24,680</strong>
            </div>

            <div className="miniStats">
              <div>
                <span>Orders</span>
                <strong>731</strong>
              </div>

              <div>
                <span>CVR</span>
                <strong>4.1%</strong>
              </div>

              <div>
                <span>AOV</span>
                <strong>€33.76</strong>
              </div>
            </div>

            <div className="chart" aria-hidden="true">
              {[22, 30, 36, 51, 47, 66, 80, 92].map((height, index) => (
                <div key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </section>

        <section className="section container hostSection" id="hosts">
          <div className="hostCopy">
            <div className="eyebrow">FOR HOSTS</div>

            <h2>
              Great on camera?
              <br />
              Get paid to sell.
            </h2>

            <p>
              You do not need millions of followers. We are building a network of
              confident people who can connect with an audience and sell.
            </p>

            <ul className="checkList">
              <li>No large audience required</li>
              <li>Session pay + performance incentives</li>
              <li>Training, scripts and product support</li>
              <li>Opportunities across multiple categories</li>
            </ul>

            <a className="btn btnSecondary" href="#host-apply">
              Apply as a host
            </a>
          </div>

          <div className="hostCards">
            <div className="profileCard p1">
              <div className="profileAvatar">M</div>
              <div>
                <strong>Maria</strong>
                <span>Beauty · Spain</span>
              </div>
              <b>4.3% CVR</b>
            </div>

            <div className="profileCard p2">
              <div className="profileAvatar">S</div>
              <div>
                <strong>Sofia</strong>
                <span>Home · Italy</span>
              </div>
              <b>€1.2K/hr</b>
            </div>

            <div className="profileCard p3">
              <div className="profileAvatar">L</div>
              <div>
                <strong>Lucas</strong>
                <span>Gadgets · France</span>
              </div>
              <b>842 orders</b>
            </div>
          </div>
        </section>

        <section className="section container applicationSection" id="apply">
          <div className="formIntro">
            <div className="eyebrow">SELL WITH US</div>

            <h2>Think your product belongs on live?</h2>

            <p>
              Send us the essentials. We review every application and contact brands
              that fit our current categories and markets.
            </p>

            <div className="formNote">
              <strong>What happens next?</strong>
              <span>
                Product review → commercial fit → pilot proposal → first live test.
              </span>
            </div>
          </div>

          <MerchantForm />
        </section>

        <section className="hostApply" id="host-apply">
          <div className="container hostApplyInner">
            <div className="hostApplyIntro">
              <div className="eyebrow">JOIN THE HOST NETWORK</div>

              <h2>Be the face of the next sales channel.</h2>

              <p>
                We are recruiting energetic hosts across Europe for paid livestream
                selling opportunities.
              </p>
            </div>

            <HostForm />
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaInner">
            <div>
              <div className="eyebrow light">LIVE COMMERCE INFRASTRUCTURE</div>

              <h2>
                Your product.
                <br />
                Our hosts.
                <br />
                <span>Real sales.</span>
              </h2>
            </div>

            <a className="btn btnLight" href="#apply">
              Start a pilot
            </a>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <a className="brand" href="#top">
          <span className="brandMark">L</span>
          <span>LiveSell</span>
        </a>

        <p>Live commerce infrastructure for modern brands.</p>

        <div>
          <a href="#apply">For brands</a> · <a href="#hosts">For hosts</a>
        </div>

        <span>© 2026 LiveSell</span>
      </footer>
    </>
  );
}
