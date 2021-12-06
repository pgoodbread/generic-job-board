export default function JobInfo() {
  return (
    <section className="w-1/3 flex-col items-center lg:flex hidden">
      <p className="text-lg border-b border-l w-full leading-relaxed py-8 text-center px-6">
        React Jobs is{" "}
        <span className="font-bold">
          the place where the{" "}
          <span className="text-primary">best react engineers</span>
        </span>{" "}
        in the world are looking for their next job
      </p>

      <div className="text-lg border-b border-l w-full leading-relaxed py-8 text-center px-6">
        Post your <span className="text-primary">job</span> now to
        <ul className="text-base">
          <li>Guarantee place in the top 3 on the startpage</li>
          <li>Increase visibility also on twitter and with the newsletter</li>
          <li>Extend the interest of highlevel react engineers</li>
        </ul>
      </div>

      <div className="text-lg border-b border-l w-full leading-relaxed py-8 text-center px-6 flex flex-col items-center">
        Pay with
        <img
          src="https://remoteok.com/assets/payment-methods.png?1634054013"
          width="350"
          height="195"
          alt="Payment methods"
        />
      </div>
    </section>
  );
}
