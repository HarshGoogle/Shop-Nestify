import React, { useState } from 'react'
import '../HomeComponents/SignUp.css'
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import SmallSpinner from './SmallSpinner';
import FormStep3 from './FormStep3';

export default function SignUp(props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)

  const handleNext = (data) => {
    setLoading(true);
    setStep(step + 1);
    setFormData({ ...formData, ...data });
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    setStep(step + 1);
    setFormData({ ...formData, ...data });
    try {
      // Make the HTTP POST request to your backend endpoint
      const response = await fetch('http://localhost:5000/apis/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {

    }
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }
  return (
    <div className='login-container'>
      <div className='Container' >
        {loading && <SmallSpinner />}
        {(step === 1) && <FormStep1 onNext={handleNext} />}
        {!loading && (step === 2) && <FormStep2 formData={formData} onNext={handleNext} />}
        {!loading && (step == 3) && <FormStep3 formData={formData} onNext={handleSignUp} />}
        {!loading && (step == 4) && <div className='complition'>Completed Successfully<a href='/login' >Login</a></div>}
      </div>
    </div>
  )
}
