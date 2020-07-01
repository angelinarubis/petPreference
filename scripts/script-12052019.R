setwd("C:/Users/prave/Desktop/selfDeception/")

### Calculate phase-1 classification score

# read data
raw_data <- read.csv(file = 'data/full-self-deception-data.csv')
cl_data <- raw_data[which(raw_data$test_part == 'test'),]

cl_data$correct <-ifelse(cl_data$C1==cl_data$correct_response, 'True', 'False')
cl_score <- (length(which(cl_data$correct == 'True'))/nrow(cl_data))*100
cl_score


### Calculate prediction score

# read data
pred_data <- raw_data[c(which(c(raw_data$test_part=='prediction')),which(c(raw_data$test_part=='c2_test'))),]
pred_data <- pred_data[-c(10)]
#View(pred_data)

# create dataframe with classification-1 responses, prediction and classification-2 responses
merged_data <- merge(pred_data,cl_data[, c("stimulus","C1")], by = "stimulus", all.x = TRUE)
#View(merged_data)

# sort data by trial order
sorted_data <- merged_data[order(merged_data$trial_index),c(1,2,3,4,5,6,7,8,9,12,10,11)]
#View(sorted_data)

# remove some columns
data <- sorted_data[-c(2,3,7,8)]
View(data)

data$correct_response[data$correct_response == ""] <- NA

# calculate prediction score
for (i in 1:nrow(data)){
  data$pred_correct[i] <- ifelse(data$A[i] == data$correct_response[i+1],1,0)
}

pred_score <- (length(which(data$pred_correct == 1))/length(which(data$test_part == 'prediction')))*100

# create groupings
for (i in 1:nrow(data)){
  data$grouping[i] <- ifelse(((data$C1[i] == data$A[i-1]) & (data$A[i-1] == data$C2[i])),'C',
                             ifelse(((data$C1[i] != data$A[i-1]) & (data$A[i-1] == data$C2[i])),'SD',
                                    ifelse(((data$C1[i] == data$A[i-1]) & (data$A[i-1] != data$C2[i])),'IC',
                                           ifelse(((data$C1[i] != data$A[i-1]) & (data$A[i-1] != data$C2[i])),'H','not grouped'))))
}

# create score for groupings
consistency_score <- (length(which(data$grouping == 'C'))/length(which(is.na(data$grouping) == 'FALSE')))*100
selfDeception_score <- (length(which(data$grouping == 'SD'))/length(which(is.na(data$grouping) == 'FALSE')))*100
inconsistency_score <- (length(which(data$grouping == 'IC'))/length(which(is.na(data$grouping) == 'FALSE')))*100
honest_score <- (length(which(data$grouping == 'H'))/length(which(is.na(data$grouping) == 'FALSE')))*100



# print classification and prediction score results
print(paste("Subject classified correctly on", round(cl_score,2), "% of the trials"))
print(paste("Subject predicted correctly on", round(pred_score,2), "% of the trials"))

# print grouping score results
print(paste("Subject received a consistency score of", round(consistency_score,2),"%"))
print(paste("Subject received a self-deception score of", round(selfDeception_score,2),"%"))
print(paste("Subject received an inconsistency score of", round(inconsistency_score,2),"%"))
print(paste("Subject received an honest score of", round(honest_score,2),"%"))



