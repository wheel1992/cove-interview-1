/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import React, { useEffect, useState } from 'react';
import { getPosts } from './solution/services';

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>

      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      setCards(posts);
    };

    fetchData().catch(console.error);
    // var data = await fetch(
    //   'https://my-json-server.typicode.com/savayer/demo/posts'
    // );
    // let json = data.json();

    // let newData;
    // json.forEach((item) => {
    //   newData.id = item.id;
    //   newData.title = item.title;
    //   newData.link_title = item.link_title;
    //   newData.link = item.link;
    //   newData.text = item.body.en.substr(0, 50) + '...';
    // });

    // setCards(newData);
  });

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards &&
        cards.map(function (item) {
          return (
            <Card
              title={item.title.en}
              linkTitle={item.link_title}
              href={item.link}
              text={item.text}
              linkClassName={item.id == 1 ? 'card__link--red' : ''}
              target={item.id == 1 ? '_blank' : ''}
              onClick={analyticsTrackClick(item.link)}
            />
          );
        })}
    </div>
  );
}
