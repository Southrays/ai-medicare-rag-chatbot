from api_layer.monitoring.logger import logger


def query_chain(chain, user_input: str):
    try:
        logger.debug(f"Running chain for input: {user_input}")
        result=chain.invoke({"input":user_input})

        print("RETRIEVED DOCUMENT COUNT:", len(result["context"]))

        for i, doc in enumerate(result["context"]):
            print(f"SOURCE {i + 1}:", doc.metadata)
            print(f"CONTENT {i + 1}:", doc.page_content[:500])

        print("GENERATED ANSWER:", result["answer"])

        response={
            "response":result["answer"],
            "sources": [
                {
                    "file": doc.metadata.get("source", "Unknown"),
                    "page": doc.metadata.get("page"),
                }
                for doc in result["context"]
            ],
        }
        logger.debug(f"Chain response:{response}")
        return response
    except Exception:
        logger.exception("Error on query chain")
        raise