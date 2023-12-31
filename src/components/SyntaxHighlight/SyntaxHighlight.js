import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SyntaxHighlight = {
  code({ node, inline, className, ...props }) {
    // Set code language declared in code block: ```lang
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag='div'
        className='codeStyle'
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
  img:({node,...props})=><img style={{maxWidth:'100%'}}{...props}/>,
};

export default SyntaxHighlight;
