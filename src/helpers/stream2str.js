async function stream2str(readableSteam) {
  let content = '';

  for await (const chunk of readableSteam) content += chunk.toString();

  return content;
}

module.exports = {
  stream2str,
};
