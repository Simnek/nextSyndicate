import classes from './NewsDetail.module.css';

const NewsDetail = (props) => {
  return (
    <section className={classes.detail}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  )
};

export default NewsDetail;