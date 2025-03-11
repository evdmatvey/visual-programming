import styles from './Card.module.css';

export const Card = ({ person }) => {
  const {
    id,
    fullName,
    name: { firstName, lastName },
    address: { line1, town, county, country },
    email,
  } = person;

  return (
    <div className={styles.card}>
      <div>
        id: <span>{id}</span>
      </div>
      <div>
        FullName: <span>{fullName}</span>
      </div>
      <div>Name:</div>
      <div className={styles.name}>
        <div>
          First name: <span>{firstName}</span>
        </div>
        <div>
          Last Name: <span>{lastName}</span>
        </div>
      </div>
      <div>Address:</div>
      <div className={styles.address}>
        <div>
          Line: <span>{line1}</span>
        </div>
        <div>
          Town: <span>{town}</span>
        </div>
        <div>
          County: <span>{county}</span>
        </div>
        <div>
          Country: <span>{country}</span>
        </div>
      </div>
      <div>
        Email: <span>{email}</span>
      </div>
    </div>
  );
};
