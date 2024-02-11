import css from './contactList.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getFilter } from 'store/getSelectors';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'store/contacts/contactsApi';

import { ProgressBar } from 'react-loader-spinner';

export const ContactList = () => {
  const filter = useSelector(getFilter);

  const { data: contacts, isLoading, error } = useGetContactsQuery();
  const [deleteContact, delInfo] = useDeleteContactMutation();

  let filterObjects = ""

  if (contacts) {
    filterObjects = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  }



  return (
    <>
      {error && <p>Error</p>}
      {delInfo.isError && <p>Error deleting contact</p>}
      {(delInfo.isLoading || isLoading) && (
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {contacts && (
        <ul className={css.contactList}>
          {filterObjects.map(({ id, number, name }) => (
            <li key={id} className={css.contactList__item}>
              <p className={css.contactList__text}>
                <span className={css.contactList__name}>{name}:</span> {number}
              </p>
              <button
                id={id}
                onClick={e => deleteContact(e.currentTarget.id)}
                type="button"
                className={css.contactList__button}
              >
                <MdDeleteForever className={css.contactList__icon} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
