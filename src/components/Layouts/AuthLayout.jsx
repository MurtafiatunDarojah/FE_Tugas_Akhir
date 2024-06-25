import { bgAuthImg, logoImg } from "../../assets";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const {
    children,
    title,
    subTitle,
    textFooter,
    subTextFooter,
    href,
    translate1,
    translate2,
  } = props;
  return (
    <div className="flex h-screen">
      <div
        className={`${translate1} flex flex-col w-1/2 justify-center items-center transition ease-in-out duration-1000`}
      >
        <div className="w-8/12">
          <h2 className="text-3xl font-bold text-yellow-500 mb-2 text-center">
            {title}
          </h2>
          <p className="text-slate-700 text-lg text-center mb-10">{subTitle}</p>
          {children}
          <p className="text-center mt-5">
            {textFooter}{" "}
            <span className="font-bold text-yellow-500">
              <Link to={`${href}`}>{subTextFooter}</Link>
            </span>
          </p>
        </div>
      </div>
      <div
        className={`${translate2} relative w-1/2 transition ease-in-out duration-1000`}
      >
        <img src={bgAuthImg} alt="" className="w-full h-full" />
        <img
          src={logoImg}
          alt=""
          className="absolute h-56 w-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
