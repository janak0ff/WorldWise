// Pricing.jsx
// This component renders the pricing page of the app.
//
// It imports the same CSS styles as the Product component.
import styles from "./Css_Modules/Product.module.css";
// It also imports the PageNav component, which is a navbar.
import PageNav from "../components/PageNav";

// This function is the Pricing component.
export default function Pricing() {
  // It returns JSX that renders the page layout.
  return (
    // The main element contains all the content on the page.
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>

        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
