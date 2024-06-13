import React, { useEffect, useState } from 'react';
import './FAQ.css';
import faq from './Frequently Asked Questions.gif';
import NawsomeLoader from './NawsomeLoader';

const faqData = [
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign Up' button located in the top right corner of the website. Fill in the required information such as your name, email address, and password, then click 'Create Account'. You'll receive a confirmation email to verify your account."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has been placed and confirmed, you'll receive a confirmation email with a tracking number. You can use this tracking number to track the status of your order on our website or the shipping carrier's website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. You can select your preferred payment method during the checkout process."
  },
  {
    question: "How do I place an order?",
    answer: "To place an order, browse our products and add desired items to your shopping cart. Proceed to checkout, fill in the shipping and payment details, review your order, and confirm the purchase."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to many countries. Shipping rates and delivery times may vary depending on the destination. Please check our shipping policy for more details."
  },
  {
    question: "Can I cancel or modify my order?",
    answer: "You may be able to cancel or modify your order if it hasn't been processed yet. Please contact our customer support team as soon as possible with your order details for assistance."
  },
  {
    question: "How do I generate an invoice for my order?",
    answer: "An invoice for your order will be automatically generated and sent to your email address once the order is confirmed. You can also log in to your account and download the invoice from the order history section."
  },
  {
    question: "What should I do if I encounter a problem with my order?",
    answer: "If you encounter any issues with your order such as missing items, damaged products, or delays, please reach out to our customer support team immediately. We'll do our best to resolve the issue promptly."
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address associated with your account, and we'll send you instructions on how to reset your password."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take the security and privacy of your personal information seriously. We use industry-standard encryption and security measures to protect your data. You can review our privacy policy for more information."
  }
];

function FAQ(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, [])
  return (
    <>
      <div className="faq-container">
        <div className='right-faq'>
          <img src={faq} className='faq2-img' />
          {loading&&<NawsomeLoader/>}
          <div className="accordion accordion-flush" id="accordionFlushExample">
            {!loading&&faqData.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed question" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${index}`} aria-expanded="false" aria-controls={`flush-collapse-${index}`}>
                    {item.question}
                  </button>
                </h2>
                <div id={`flush-collapse-${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body answer">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
