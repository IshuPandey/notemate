import React from "react";



function About() {
  return (
    <>
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light ">About the app</h1>
              <p className="lead text-muted my-3">             
This notes app is a simple, yet powerful tool for taking notes. It is built using the MERN stack, which is a popular combination of technologies for building web applications. The app is easy to use and can be accessed from any device with an internet connection.
              </p>
              <p className="lead text-muted my-3"> 
              Various APIs are created using different endpoints and routes which includes user authentication and CRUD operations on notes.            
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
