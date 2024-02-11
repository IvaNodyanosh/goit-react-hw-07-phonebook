import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'store/contacts/contactsOperation';
import { isLoadingContacts } from 'store/getSelectors';
import { errorContacts } from 'store/getSelectors';

import css from './app.module.css';

export const App = () => {
  const isLoading = useSelector(isLoadingContacts);
  const error = useSelector(errorContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.phonebook__header}>Phonebook</h1>

      <ContactForm />
      <h2 className={css.phonebook__title}>Contacts</h2>
      <Filter />
      {isLoading && !error && <p>Request in progress...</p>}
      <ContactList />
    </div>
  );
};
