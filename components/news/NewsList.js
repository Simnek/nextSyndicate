import NewsItem from './NewsItem';
import classes from './NewsList.module.css';

function NewsList(props) {
  return (
    <ul className={classes.list}>
      {props.newsData.map((news) => (
        <NewsItem
          key={news.id}
          id={news.id}
          title={news.title}
        />
      ))}
    </ul>
  );
}

export default NewsList;
