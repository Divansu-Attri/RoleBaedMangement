
export default function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div className="text-center">
      <h1 className="display-4">Welcome to the Home Page</h1>
      <p className="lead">
        This is the home page of our website. We are excited to have you here!
      </p>
      <hr className="my-4" />
      <p>
        I developed this website to demonstrate my full-stack logic [MongoDB, ExpressJs, ReactJs, NodeJs]. In the
        backend, I utilized the jsonwebtoken third-party module for
        authentication, the bcrypt package for password hashing. Additionally, I used several other packages,
        such as dotenv, cors, etc.
      </p>
      <p>
        For the frontend, I employed the React Vite tool and used the Toast
        package for displaying alert messages.
      </p>
      <hr className="my-4" />
      <h4>If you want to visit Admin Pannel then login this:</h4>
      <p>Email: r@gmail.com</p>
      <p>Password: roni123</p>
      <a className="btn btn-success btn-lg" href="/services" role="button">
        Prodcuts
      </a>
    </div>
  </div>
  )
}
