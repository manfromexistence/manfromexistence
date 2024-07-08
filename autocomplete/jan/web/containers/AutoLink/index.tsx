import React from 'react'

type Props = {
  text: string
}

const AutoLink: React.FC<Props> = ({ text }) => {
  const delimiter =
    /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9-]{1,61}[a-z0-9])?\.[^.|\s])+[a-z.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_/~#&=;%+?\-\\(\\)]*)/gi

  return (
    <>
      {text.split(delimiter).map((word) => {
        const match = word.match(delimiter)
        if (match) {
          const url = match[0]
          return (
            <a
              key={url}
              target="blank"
              href={url.startsWith('http') ? url : `http://${url}`}
              className="text-primary dark:text-blue-400"
            >
              {url}
            </a>
          )
        }
        return word
      })}
    </>
  )
}

export default React.memo(AutoLink)
