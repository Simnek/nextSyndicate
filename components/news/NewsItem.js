import { useRouter } from 'next/router';

import classes from './NewsItem.module.css';

function NewsItem(props) {

  const router = useRouter(); //same applies with next, use hooks at the root level of the function component

  const showDetailsHandler = () => {
    router.push('/' + props.id); //navigate programmatically
  };

  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <h3>{props.title}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={showDetailsHandler}>Pogledaj vise...</button>
      </div>
    </li>
  );
}

export default NewsItem;
