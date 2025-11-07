from schema.schema_pb2 import UserAttention, LowAttentionReason

def main():
    user1 = UserAttention(
    Name="Alice",
       Age=20,
       Gender="Female",
       Residence="Dhaka",
       Reason_las=LowAttentionReason.MULTITASKING,
       Screentime=5.5,
       Attention_Span=2.3
    )
    
    print(type(user1))


if __name__ == "__main__":
    main()
