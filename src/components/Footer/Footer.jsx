import React from "react"
import "./Footer.css"
import TwitterIcon from "@material-ui/icons/Twitter"
import InstagramIcon from "@material-ui/icons/Instagram"
import FacebookIcon from "@material-ui/icons/Facebook"
import { Link } from "react-router-dom"
import Footer_data from "./F__Data"
export default function Footer() {
  return (
    <div class="footer">
      <span className="footer__title">Quizando</span>
      <div class="footer-content">
        {Footer_data.fdata.map((item1, idx1) => {
          return (
            <div className="footer-descr">
              {item1.map((item2, idx2) => {
                return (
                  <Link
                    to={item2.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h2>{item2.title}</h2>
                  </Link>
                )
              })}
            </div>
          )
        })}

        <div className="footer__payments">
          <h2 className="footer__title">Connect with us:</h2>
          <div className="socials">
            <TwitterIcon className="footer__social" />
            <FacebookIcon className="footer__social" />
            <InstagramIcon className="footer__social" />
          </div>
          <h2 className="customer__support">Customer Support</h2>
          <div className="payment__options">
            <img alt="" src="https://www.quizando.com/assets/visa.png" />
            <img alt="" src="https://www.quizando.com/assets/mastercard.png" />
            <img alt="" src="https://www.quizando.com/assets/PayPal.png" />
          </div>
        </div>
      </div>
      <div className="copywrite">
        <span>
          Quizando is a company operating in Malta with the registration number
          C-67170 and its registered office at Quizando, Web Matters Limited,
          Ferris Building Level 1, 1, St Luke's Rd G'Mangia, Pieta PTA 1020,
          Malta.
        </span>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom__content">
          <div className="left__section">
            <img
              alt=""
              src="https://www.quizando.com/assets/Quizando-Logo.png"
            />
            <span>Copyright © {new Date().getFullYear()}</span>
          </div>
          <img
            alt=""
            className="webmatters"
            src="https://www.quizando.com/assets/webmatters.png"
          />
        </div>
      </div>
    </div>
  )
}
