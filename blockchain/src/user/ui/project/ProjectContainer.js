import { connect } from 'react-redux'
import Project from './Project'
import { fetchProject } from './ProjectActions'

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => {
      dispatch(fetchProject())
    }
  }
}

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)

export default ProjectContainer
