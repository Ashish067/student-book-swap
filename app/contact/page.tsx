import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4 text-gray-600">
              Have a question or feedback? We're here to help! Fill out the form
              and we’ll get back to you soon.
            </p>
            <p className="mb-2">
              📧 <strong>Email:</strong>
              <br />
              <a
                href="mailto:support@studentbookswap.com"
                className="text-blue-600"
              >
                support@studentbookswap.com
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              123 University Ave,
              <br />
              Campus Center, Room 101
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Your email"
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="p-2 border rounded"
              ></textarea>
              <button
                type="submit"
                className="bg-gray-800 text-white py-2 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
