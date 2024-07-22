import { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router-dom'
import { headerFeedbacks } from './feedbackHeaderList'
import { IFeedbacks } from './InterfaceFeedback'
import SEO from '../../../Components/SEO/SEO'

const FeedbacksPage = () => {
    const { feedbacks } = useLoaderData() as { feedbacks: Array<IFeedbacks> }

    return (
        <div className='feedback_main'>
            <SEO title={"פידבקים"} />
            <h2 className='big_header'>הפידבקים שלנו</h2>
            <Suspense fallback={<h1 className='no_data_text'>Loading...</h1>}>
                <Await resolve={feedbacks}>
                    <div className='feedback_main__feedbackList'>
                        <div className='feedback_main__feedbackList--headers'>
                            {headerFeedbacks.map((header, i) => (
                                <h3 key={i}>{header}</h3>
                            ))}
                        </div>
                        {feedbacks.length > 0 ?
                            <div className='feedback_main__feedbackList--list'>
                                {feedbacks.map(fdk => (
                                    <div key={fdk._id} className='feedback_main__feedbackList--list-item'>
                                        <h4>{fdk.customerName}</h4>
                                        <p>{fdk.customerFeedback}</p>
                                        <Link
                                            to={`/dashboard/projects/project/${fdk.projectId}`}
                                        >{fdk.webSiteName}</Link>
                                    </div>))}
                            </div> : <h3 className='no_data_text'>אין פידבקים</h3>}
                    </div>
                </Await>
            </Suspense>
        </div>
    )
}

export default FeedbacksPage