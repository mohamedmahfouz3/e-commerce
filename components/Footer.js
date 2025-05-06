import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

function _footer() {
  return (
    <footer class="footer-section" id="contact-footer">
      <div class="footer-cont">
        <div class="footer-cta pt-5 pb-5">
          <div class="row">
            <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="fas fa-map-marker-alt"></i>
                <div class="cta-text">
                  <h4>Find us</h4>
                  <span>1010 Shoubra, Cairo, Egypt</span>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="fas fa-phone"></i>
                <div class="cta-text">
                  <h4>Call us</h4>
                  <span>9876543210 0</span>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-30">
              <div class="single-cta">
                <i class="far fa-envelope-open"></i>
                <div class="cta-text">
                  <h4>Mail us</h4>
                  <span>mail@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-content pt-5 pb-5">
          <div class="row">
            <div class="col-xl-4 col-lg-4 mb-50">
              <div class="footer-widget">
                <div class="footer-logo">
                  <a href="/">
                    <img src="lgo2.svg" class="img-fluid" alt="logo" />
                  </a>
                </div>
                <div class="footer-text">
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                    sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <div class="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#">
                    <i class="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-google-plus-g google-bg"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div class="footer-widget">
                <div class="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div class="footer-text mb-25">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div class="subscribe-form"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright-area">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 text-center text-lg-left">
              <div class="copyright-text">
                <p>
                  Copyright &copy; 2018, All Right Reserved{" "}
                  <a href="">Shoubra</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default _footer;
