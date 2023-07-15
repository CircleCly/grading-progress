const divElement = document.querySelector('div[data-react-class="SubmissionGrader"]');
if (divElement) {
  const reactProps = divElement.getAttribute('data-react-props');
  const propsObject = JSON.parse(reactProps);
  alert(propsObject["num_graded_submissions"] + "/" + propsObject["num_submissions"])
}

