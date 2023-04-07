import React from 'react'

function Footer() {
  return (
    <div className="pt-5">
        <footer className="text-center text-lg-start text-white" style={{ backgroundColor: 'rgba(53, 50, 50, 0.8)' }}>
          <div className="container p-4 pb-0">
            <section>
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    SHOPPING WELL
                  </h6>
                  <p>
                    After both the Prohibition era and COVID-19, 
                    the alcohol industry started evolving at a rapid pace. 
                    As such, the industry has gained extreme significance recently. 
                    The alcoholic beverage industry now has millions of stores around the world. 
                    Recently, we've even seen an increase in business owners taking the opportunity to start selling alcohol online.
                  </p>
                </div>
                <hr className="w-100 clearfix d-md-none" />
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                  <p>
                    <a className="text-white" href="https://www.absolut.com/en/">ABSOLUT Vodka</a>
                  </p>
                  <p>
                    <a className="text-white" href="https://www.jackdaniels.com/">JACK DANIEL'S Wiskey</a>
                  </p>
                  <p>
                    <a className="text-white" href="https://www.woodfordreserve.com/">WOODFORD Bourbon</a>
                  </p>
                  <p>
                    <a className="text-white" href="https://www.hennessy.com/en-int/collection/hennessy-paradis">HENNESSY Cognac</a>
                  </p>
                </div>
                <hr className="w-100 clearfix d-md-none" />
                <hr className="w-100 clearfix d-md-none" />
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Contacts</h6>
                  <p><i className="fas fa-home mr-3" /> Burgas, Bulgaria</p>
                  <p><i className="fas fa-envelope mr-3" /> petar_vs@outlook.com</p>
                  <p><i className="fas fa-phone mr-3" /> + 01 234 567 88</p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                  <a className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: '#3b5998' }}
                    href="https://www.facebook.com/profile.php?id=100000562363371"
                    role="button">
                    <i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: '#0082ca' }}
                    href="https://www.linkedin.com/in/petar-kostadinov-759ba8213/"
                    role="button">
                    <i className="fab fa-linkedin-in" /></a>
                  <a className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: '#333333' }}
                    href="https://github.com/PetarKostadinov"
                    role="button">
                    <i className="fab fa-github" /></a>
                </div>
              </div>
            </section>
          </div>
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <p className="text-white">2023 Copyright: Petar Kostadinov &copy;</p>
          </div>
        </footer>
      </div>
  )
}

export default Footer;
