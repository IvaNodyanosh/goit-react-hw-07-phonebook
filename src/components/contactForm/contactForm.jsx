import css from './contactForm.module.css';
import { useState } from 'react';
import { RiContactsFill } from 'react-icons/ri';
import { BsTelephoneFill } from 'react-icons/bs';
import { BsPersonFillAdd } from 'react-icons/bs';
import { useAddContactMutation } from 'store/contacts/contactsApi';
import { useGetContactsQuery } from 'store/contacts/contactsApi';

export const ContactForm = () => {
  const [contactInfo, changeContactInfo] = useState({
    name: '',
    number: '',
  });

    const { data: contacts} = useGetContactsQuery();

  const { name, number } = contactInfo;

  const [ addContact] = useAddContactMutation();

  const formReset = () => {
    changeContactInfo({ name: '', number: '' });
  };

  const formSubmit = e => {
    e.preventDefault();
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name}is already in contacts`);
    } else if (contacts.some(contact => contact.number === number)) {
      return alert(`${number}is already in contacts`);
    }
    formReset();
    addContact({name, number});
  };

  const changeInput = e => {
    changeContactInfo(prevInfo => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={formSubmit} className={css.contactForm}>
      <label>
        <RiContactsFill className={css.contactForm__icon} />
        <input
          type="text"
          name="name"
          required
          onChange={changeInput}
          value={name}
          placeholder="Name"
        />
      </label>
      <label>
        <BsTelephoneFill className={css.contactForm__icon} />
        <input
          type="tel"
          name="number"
          required
          onChange={changeInput}
          value={number}
          placeholder="Number"
        />
      </label>
      <button type="submit" className={css.contactForm__button}>
        <BsPersonFillAdd className={css.contactForm__iconAdd} />
      </button>
    </form>
  );
};
