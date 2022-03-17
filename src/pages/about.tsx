export async function getStaticProps() {
  return {
    props: {
      title: 'About us',
    },
  };
}

const about = ({ title }) => {
  return <h1>{title}</h1>;
};

export default about;
