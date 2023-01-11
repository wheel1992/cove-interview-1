import React, { useEffect, useState } from 'react';
import Card from './card';
import { getPosts } from './services';

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts();
      setCards(posts);
    };

    fetchData().catch(console.error);
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  function resolveDisplayText(text) {
    if (!text) {
      return '';
    }
    return text.en.substr(0, 50) + '...';
  }

  function resolveLinkClassName(id) {
    return id === 1 ? 'card__link--red' : '';
  }

  function resolveTarget(id) {
    return id === 1 ? '_blank' : '';
  }

  return (
    <div>
      {cards &&
        cards.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title.en}
              linkTitle={item.link_title}
              href={item.link}
              text={resolveDisplayText(item.text)}
              linkClassName={resolveLinkClassName(item.id)}
              target={resolveTarget(item.id)}
              onClick={() => analyticsTrackClick(item.link)}
            />
          );
        })}
    </div>
  );
}
