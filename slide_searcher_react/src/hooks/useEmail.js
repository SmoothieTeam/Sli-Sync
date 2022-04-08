import emailjs from '@emailjs/browser';

emailjs.init('crLAq1VNDx36OEngX');

const useEmail = (title, link) => {
  const sendEmail = (to_email) => {
    emailjs.send("sli-sync", "template_c67g5ip", {title, link, to_email});
  };

  return {
    sendEmail
  };
};

export {
  useEmail
};